import { createContext, useState, useEffect } from "react";
import Cardio from "../interfaces/cardio.interface";
import StrengthExercise from "../interfaces/strengthExercise.interface";
import Statistics from "../interfaces/statistics.interface";

interface DataContextProps {
  cardioData?: Cardio[];
  strengthData?: StrengthExercise[];
  statisticsData?: Statistics[];
  update: () => void;
}

const DataContextCtx = createContext<DataContextProps>({
	cardioData: [],
	strengthData: [],
	statisticsData: [],
	update: () => {},
});

function DataContextProvider({ children }: { children: React.ReactNode }) {
	const [cardioData, setCardioData] = useState<Cardio[]>([]);
	const [strengthData, setStrengthData] = useState<StrengthExercise[]>([]);
	const [statisticsData, setStatisticsData] = useState<Statistics[]>([]);
	const [isUpdate, setIsUpdate] = useState(true)

		useEffect(() => {
			const fetchCardio = async () => {
			try {
				const response = await fetch('http://localhost:3000/cardio');
				if (!response.ok) {
				throw new Error('Network response was not ok');
				}
				const cardioData = await response.json();
				console.log(cardioData);
				setCardioData(cardioData);
			} catch (error) {
				console.error('Błąd pobierania danych 1:', error);
			}
			};

			const fetchStrength = async () => {
			try {
				const response = await fetch('http://localhost:3000/strength');
				if (!response.ok) {
				throw new Error('Network response was not ok');
				}
				const strengthData = await response.json();
				console.log(strengthData);
				setStrengthData(strengthData);
			} catch (error) {
				console.error('Błąd pobierania danych 2:', error);
			}
			};

			const fetchStatistics = async () => {
			try {
				const response = await fetch('http://localhost:3000/statistics');
				if (!response.ok) {
				throw new Error('Network response was not ok');
				}
				const statisticsData = await response.json();
				console.log(statisticsData);
				setStatisticsData(statisticsData);
			} catch (error) {
				console.error('Błąd pobierania danych 3:', error);
			}
			};

			fetchCardio();
			fetchStrength();
			fetchStatistics();
		}, [isUpdate]);

		const update = () => {
			setIsUpdate(!isUpdate)
		}

		return (
			<DataContextCtx.Provider
			value={{
				cardioData,
				strengthData,
				statisticsData,
				update,
			}}
			>
			{children}
			</DataContextCtx.Provider>
		);
}

export { DataContextCtx, DataContextProvider };
