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
  addStrengthData: (data: StrengthExercise) => Promise<void>;
  addCardioData: (data: Cardio) => Promise<void>;
  update: () => void;
}

const DataContextCtx = createContext<DataContextProps>({
	cardioData: [],
	strengthData: [],
	statisticsData: [],
	addStrengthData: async () => {
		return Promise.resolve();
	},
	addCardioData: async () => {
		return Promise.resolve();
	},
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

	const addStrengthData = async (data: StrengthExercise) => {
		axios
			.post('http://localhost:3000/strength', data)
			.then((response) => {
				console.log('Dane zostały wysłane', response.data);
			})
			.catch((error) => {
				console.error('Błąd podczas wysyłania danych:', error);
			});
	};

	const addCardioData = async (data: Cardio) => {
		axios.post('http://localhost:3000/cardio', data)
			.then(response => {
				console.log('Dane zostały wysłane', response.data);
			})
			.catch(error => {
				console.error('Błąd podczas wysyłania danych:', error);
			});
	};

	const update = () => {
		setIsUpdate(!isUpdate);
	};

	return (
		<DataContextCtx.Provider
			value={{
				cardioData,
				strengthData,
				statisticsData,
				addStrengthData,
				addCardioData,
				update,
			}}
		>
			{children}
		</DataContextCtx.Provider>
	);
}

export { DataContextCtx, GetDataContextProvider };
