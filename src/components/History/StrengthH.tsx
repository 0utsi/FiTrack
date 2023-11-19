import axios from "axios";
import { useEffect, useState } from "react";
import Strength from "../../interfaces/Istrength";
import '../../style/history.css'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React from "react";
import { TablePagination } from "@mui/material";

const StrengthH = () => {
  const [strengthData, setStrengthData] = useState<Strength[]>();
  const [params, setParams] = useState({
    params: {
      'order': "ASC",
      'sortBy': "date",
    },
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  const sortBy = (by: string) => {
    const newOrder = params.params.order === 'ASC' ? 'DESC' : 'ASC';
    setParams({
      params: {
        'order': newOrder,
        'sortBy': by,
      },
    });
  }

  const formatDateString = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const indexOfLastItem = (page + 1) * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = strengthData?.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };
if(strengthData)
  return (
    <div className="histPanel">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Exercise</TableCell>
              <TableCell className="sortColumn" onClick={() => sortBy("weight")}>Weight [kg]</TableCell>
              <TableCell className="sortColumn" onClick={() => sortBy("sets")}>Sets</TableCell>
              <TableCell className="sortColumn" onClick={() => sortBy("repetitions")}>Repetitions</TableCell>
              <TableCell className="sortColumn" onClick={() => sortBy("date")}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.exerciseName}</TableCell>
                <TableCell>{item.weight}</TableCell>
                <TableCell>{item.sets}</TableCell>
                <TableCell>{item.repetitions}</TableCell>
                <TableCell>{formatDateString(item.date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={strengthData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default StrengthH;
