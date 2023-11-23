import React, { useContext, useState } from "react";
import { DataContextCtx } from "../../providers/DataContextProvider";
import '../../style/history.less';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { AccordionDetails, IconButton, TableHead } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const CardioH = () => {
  const { cardioData } = useContext(DataContextCtx);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const indexOfLastItem = (page + 1) * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = cardioData?.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = (id?: number) => {
	if (id !== undefined) {
		axios
			.delete(`http://localhost:3000/cardio/${id}`)
			.then((res) => {
				console.log('Usunięto rekord o ID:', id, res);
			})
			.catch((err) => {
				console.error('Błąd podczas usuwania:', err);
			});
	}

  };

  if (cardioData) {
    return (
      <div className="histPanel">
          {currentItems?.map((item, index) => (
            <Accordion key={index} sx={{
				borderRadius: 3,
				overflow: 'hidden',
				marginBottom: 0.5,
				width: '70%'}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
					minHeight: 10,
					justifyContent: 'space-between',
                }}
              >
                <Typography mt={0} sx={{ fontSize: 14, marginRight: 'auto'}}>{item.exerciseName}</Typography>
                <Typography mt={0} sx={{ marginLeft: 'auto', fontSize: 11 }}>{(new Date(item.date).toLocaleDateString())}</Typography>
              </AccordionSummary>
			<AccordionDetails sx={{ zIndex: 1000, padding: 0, margin: 0}} >
						<IconButton onClick={() => handleDelete(item.id)} size="small" sx={{position: 'absolute', right: '0'}}>
							<FontAwesomeIcon icon={faTrash} />
						</IconButton>
						<TableContainer component={Paper} sx={{ margin: 0 }}>
							<Table size="small">
							<TableHead>
								<TableRow>
								<TableCell  sx={{ fontSize: 12 }}>Distance[KM]</TableCell>
								<TableCell  sx={{ fontSize: 12 }}>Duration[min]</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
							<TableRow key={index} sx={{ marginBottom: 0.5 }}>
								<TableCell size='small' sx={{ fontSize: 11 }}>{item.distance / 1000}</TableCell>
								<TableCell size='small' sx={{ fontSize: 11 }}>{item.duration}</TableCell>
							</TableRow>
							</TableBody>
							</Table>
						</TableContainer>
					</AccordionDetails>
            </Accordion>
          ))}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
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
  return null;
}

export default CardioH;
