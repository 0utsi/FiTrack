import axios from "axios";
import { useEffect, useState } from "react";
import Cardio from "../../interfaces/Icardio";
import '../../style/history.less'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React from "react";
import { TablePagination } from "@mui/material";

const CardioH = () => {
  const [cardioData, setCardioData] = useState<Cardio[]>();
  const [params, setParams] = useState({
    params: {
      'order': "ASC",
      'sortBy': "date",
    },
  })
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    axios.get('http://localhost:3000/cardio', params)
      .then(response => {
        console.log(response.data)
        if (response.data) {
          setCardioData(response.data);
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
  const currentItems = cardioData?.slice(indexOfFirstItem, indexOfLastItem);


  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

if(cardioData)
  return (
     <div className="histPanel">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Exercise</TableCell>
              <TableCell>Distance</TableCell>
              <TableCell className="sortColumn" onClick={() => sortBy("duration")}>Duration [min]</TableCell>
              <TableCell className="sortColumn" onClick={() => sortBy("date")}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.exerciseName}</TableCell>
                <TableCell>{item.distance}</TableCell>
                <TableCell>{item.duration}</TableCell>
                <TableCell>{formatDateString(item.date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={cardioData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default CardioH;
