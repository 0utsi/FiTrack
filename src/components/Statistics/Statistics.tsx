import axios from "axios";
import { useEffect, useState } from "react";
import '../../style/statistics.less'
import Statistics from "../../interfaces/statistics.interface";
import { Card, CardContent, Typography } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeightHanging, faPersonRunning } from '@fortawesome/free-solid-svg-icons';

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
				<Typography component="div" variant="body2" marginBottom={0.5}>
					Total Weight Lifted
				</Typography>
				<Typography variant="caption" color="text.secondary" display="flex" alignItems="center" >
					<span>{statisticsData.totalWeight / 1000} [T]</span>
					<FontAwesomeIcon icon={faWeightHanging} style={{ marginLeft: 'auto', fontSize: '17px'  }} />
				</Typography>
			</CardContent>
		</Card>
		<Card>
			<CardContent>
				<Typography component="div" variant="body2" marginBottom={0.5}>
					Total Distance Travelled
				</Typography>
				<Typography variant="caption" color="text.secondary" display="flex" alignItems="center" >
					<span>{statisticsData.totalDistance / 1000} [KM]</span>
					<FontAwesomeIcon icon={faPersonRunning} style={{ marginLeft: 'auto', fontSize: '20px' }} />

				</Typography>
			</CardContent>
		</Card>
	</div>
)}

export default Statistics;