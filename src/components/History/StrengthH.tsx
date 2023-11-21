import React, { useEffect, useState } from "react";
import axios from "axios"
import StrengthExercise from "../../interfaces/strengthExercise.interface";
import '../../style/history.less'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Accordion, AccordionDetails, AccordionSummary, IconButton, TablePagination, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StrengthH = () => {
  const [strengthData, setStrengthData] = useState<StrengthExercise[]>();
  const [id, setId] = useState<number>()
  const [params] = useState({
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
  }, [params, id]);


  const formatDateString = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleDelete = (id: number) => {
	setId(id)
		axios
			.delete(`http://localhost:3000/strength/${id}`)
			.then((res) => {
				console.log('Usunięto rekord o ID:', id, res);
			})
			.catch((err) => {
				console.error('Błąd podczas usuwania:', err);
			});
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const renderSets = (sets: {weight: number, repetitions: number}[]) => {
    return sets.map((set: {weight: number, repetitions: number}, index: number) => (
      <TableRow key={index} sx={{ marginBottom: 0.5 }}>
		<TableCell size='small' sx={{ fontSize: 11 }}>{index +1}</TableCell>
		<TableCell size='small' sx={{ fontSize: 11 }}>{set.repetitions}</TableCell>
        <TableCell size='small' sx={{ fontSize: 11 }}>{set.weight}</TableCell>
      </TableRow>
    ));
  };

	if(strengthData)
		return (
			<div className="histPanel">
			{strengthData?.map((item, index) => (
				<Accordion key={index} sx={{ borderRadius: 3, overflow: 'hidden', marginBottom: 0.5, width: '80%'}}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						sx={{
							minHeight: 20,
							justifyContent: 'space-between',
						}}
						>
							<Typography mt={0} sx={{ fontSize: 14, marginRight: 'auto' }}>{item.exerciseName}</Typography>
							<Typography mt={0} sx={{ marginLeft: 'auto', fontSize: 11 }}>
								{formatDateString(item.date)}
							</Typography>
					</AccordionSummary>
					<AccordionDetails sx={{ zIndex: 1000, padding: 0, margin: 0}} >
					<IconButton onClick={() => handleDelete(item.id)} size="small" sx={{position: 'absolute', right: '0'}}>
							<FontAwesomeIcon icon={faTrash} />
						</IconButton>
						<TableContainer component={Paper} sx={{ margin: 0 }}>
							<Table size="small">
							<TableHead>
								<TableRow>
								<TableCell  sx={{ fontSize: 12 }}>Set</TableCell>
								<TableCell  sx={{ fontSize: 12 }}>Repetitions</TableCell>
								<TableCell  sx={{ fontSize: 12 }}>Weight [kg]</TableCell>
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
