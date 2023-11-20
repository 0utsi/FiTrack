import axios from "axios";
import { useEffect, useState } from "react";
import {StrengthExercise} from "../../interfaces/strengthExercise.interface";
import '../../style/history.less'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, TablePagination, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StrengthH = () => {
  const [strengthData, setStrengthData] = useState<StrengthExercise[]>();
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
        console.log("data: "+response.data)
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

  const renderSets = (sets: any) => {
    return sets.map((set: any, index: number) => (
      <TableRow key={index}>
        <TableCell>{set.weight}</TableCell>
        <TableCell>{set.repetitions}</TableCell>
      </TableRow>
    ));
  };

	if(strengthData)
		return (
			<div className="histPanel">
			{strengthData?.map((item, index) => (
				<Accordion key={index}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-${index}`} id={`panel-${index}`}>
					<Typography>{item.exerciseName}</Typography>
					<Typography fontSize={12}>{formatDateString(item.date)}</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<TableContainer component={Paper}>
					<Table>
						<TableHead>
						<TableRow>
							<TableCell>Weight [kg]</TableCell>
							<TableCell>Repetitions</TableCell>
						</TableRow>
						</TableHead>
						<TableBody>
						{item.sets && item.sets.length > 0 ? renderSets(item.sets) : null}
						</TableBody>
					</Table>
					</TableContainer>
				</AccordionDetails>
				</Accordion>
			))}
			<TablePagination
				rowsPerPageOptions={[10, 25]}
				component="div"
				count={strengthData?.length || 0}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
			</div>
		);
}

export default StrengthH;
