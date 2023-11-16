import axios from "axios";
import { useEffect, useState } from "react";
import Cardio from "../../interfaces/Icardio";
import '../../style/history.css'
import Pagination from "@mui/material/Pagination";
const CardioH = () => {

	const [cardioData, setCardioData] = useState<Cardio[]>();
	const [params, setParams] = useState({
		params: {
			'order': "ASC",
			'sortBy': "date",
		},
	})
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

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

	const formatDateString = (dateString: Date) => {
		const date = new Date(dateString);
		return date.toLocaleDateString();
	};
	const handleChangePage = (_event: React.ChangeEvent<unknown>, newPage: number) => {
		setCurrentPage(newPage);
	};

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = cardioData?.slice(indexOfFirstItem, indexOfLastItem);

	const sortBy = (by: string) => {
		const newOrder = params.params.order === 'ASC' ? 'DESC' : 'ASC';
		setParams({
			params: {
				'order': newOrder,
				'sortBy': by,
			},
			});
	}

	return <div className="histPanel">
				<table>
					<thead>
						<tr>
							<th>Exercise</th>
							<th onClick={() => sortBy("duration")}>Duration [min]</th>
							<th onClick={() => sortBy("date")} >Date</th>
						</tr>
					</thead>
					<tbody>
					{currentItems?.map((item, index) => (
						<tr key={index}>
						<td>{item.exerciseName}</td>
						<td>{item.duration}</td>
						<td>{formatDateString(item.date)}</td>
						</tr>
					))}
					</tbody>
				</table>
				<Pagination
					color="primary"
					shape="rounded"
					className="pagination"
					count={Math.ceil((cardioData?.length || 0) / itemsPerPage)}
					page={currentPage}
					onChange={handleChangePage}
				/>
			</div>
}

export default CardioH