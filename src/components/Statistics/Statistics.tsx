import axios from "axios";
import { useEffect, useState } from "react";
import '../../style/statistics.less'
import Statistics from "../../interfaces/Istatistics";
import { Card, CardContent, Typography } from "@mui/material";

const Statistics = () => {

	const [statisticsData, setStatisticData] = useState<Statistics>()

	useEffect(() => {
		axios
			.get('http://localhost:3000/statistics').then(res => {
				console.log(res.data)
				setStatisticData(res.data)
		}).catch(err => { console.log(err)})
	},[])


if(statisticsData)
	return (
		<div className="statistics">
		<Card>
			<CardContent>
				<Typography component="div">
					Total Weight Lifted
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{statisticsData.totalWeight} [Kg]
				</Typography>
			</CardContent>
		</Card>
		<Card>
			<CardContent>
				<Typography component="div">
					Total Distance Travelled
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{statisticsData.totalDistance} [m]
				</Typography>
			</CardContent>
		</Card>
	</div>
)}

export default Statistics;