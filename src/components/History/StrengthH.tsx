import axios from "axios";
import { useEffect, useState } from "react";
import Strength from "../../interfaces/Istrength";
import '../../style/history.css'
import Pagination from "@mui/material/Pagination";

const StrengthH = () => {
  const [strengthData, setStrengthData] = useState<Strength[]>();
  const [params, setParams] = useState({
    params: {
      'order': "ASC",
      'sortBy': "date",
    },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get('http://localhost:3000/strength', params)
      .then(response => {
        console.log(response.data)
        if (response.data) {
          setStrengthData(response.data);
        }
      })
      .catch(error => {
        console.error('Błąd podczas pobierania danych:', error);
      });
  }, [params]);

  const formatDateString = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleChangePage = (_event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = strengthData?.slice(indexOfFirstItem, indexOfLastItem);

  const sortBy = (by: string) => {
    const newOrder = params.params.order === 'ASC' ? 'DESC' : 'ASC';
    setParams({
      params: {
        'order': newOrder,
        'sortBy': by,
      },
    });
  }

  return (
    <div className="histPanel">
      <table>
        <thead>
          <tr>
            <th>Exercise</th>
            <th onClick={() => sortBy("weight")}>Weight [kg]</th>
            <th onClick={() => sortBy("sets")}>Sets</th>
            <th onClick={() => sortBy("repetitions")}>Repetitions</th>
            <th onClick={() => sortBy("date")}>Date</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((item, index) => (
            <tr key={index}>
              <td>{item.exerciseName}</td>
              <td>{item.weight}</td>
              <td>{item.sets}</td>
              <td>{item.repetitions}</td>
              <td>{formatDateString(item.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        color="primary"
        shape="rounded"
        className="pagination"
        count={Math.ceil((strengthData?.length || 0) / itemsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
      />
    </div>
  );
}

export default StrengthH;
