import { useContext, useState } from "react";
import { GetDataContextCtx } from "../../providers/DataGetContextProvider";
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
	const {cardioData} = useContext(GetDataContextCtx)
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

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
              <TableCell>Distance [m]</TableCell>
              <TableCell className="sortColumn" >Duration [min]</TableCell>
              <TableCell className="sortColumn">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.exerciseName}</TableCell>
                <TableCell>{item.distance}</TableCell>
                <TableCell>{item.duration}</TableCell>
                <TableCell>{(new Date(item.date).toLocaleDateString())}</TableCell>
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
