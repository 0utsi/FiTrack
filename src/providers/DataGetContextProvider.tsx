import { createContext, useState, useEffect } from "react";
import Cardio from "../interfaces/cardio.interface";
import StrengthExercise from "../interfaces/strengthExercise.interface";
import Statistics from "../interfaces/statistics.interface";
import axios from 'axios';
import StatisticsI from "../interfaces/statistics.interface";

interface DataContextProps {
  cardioData: Cardio[];
  strengthData: StrengthExercise[];
  statisticsData: StatisticsI[];
  update: () => void;
}

const GetDataContextCtx = createContext<DataContextProps>({
	cardioData: [],
	strengthData: [],
	statisticsData: [],
	update: () => {},
});

export default function GetDataContextProvider({ children }: { children: React.ReactNode }) {
	const [cardioData, setCardioData] = useState<Cardio[]>([]);
	const [strengthData, setStrengthData] = useState<StrengthExercise[]>([]);
	const [statisticsData, setStatisticsData] = useState<Statistics[]>([]);
	const [isUpdate, setIsUpdate] = useState(true);
	useEffect(() => {

		const fetchCardio = async () => {
			try {
				const response = await axios.get('http://localhost:3000/cardio');
				setCardioData(response.data);
			} catch (error) {
				console.error('Błąd pobierania danych 1:', error);
			}
		};

		const fetchStrength = async () => {
			try {
				const response = await axios.get('http://localhost:3000/strength');
				console.log("providerGet"+response.data )
				setStrengthData(response.data);
			} catch (error) {
				console.error('Błąd pobierania danych 2:', error);
			}
		};

		const fetchStatistics = async () => {
			try {
				const response = await axios.get('http://localhost:3000/statistics');
				setStatisticsData(response.data);
			} catch (error) {
				console.error('Błąd pobierania danych 3:', error);
			}
		};

		fetchCardio();
		fetchStrength();
		fetchStatistics();
	},[]);

	const update = () => {
		setIsUpdate(!isUpdate);
	};

	return (
		<GetDataContextCtx.Provider
			value={{
				cardioData,
				strengthData,
				statisticsData,
				update,
			}}
		>
			{children}
		</GetDataContextCtx.Provider>
	);
}

export { GetDataContextCtx, GetDataContextProvider };
