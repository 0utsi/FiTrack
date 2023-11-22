import{ createContext, ReactNode } from 'react';
import StrengthExercise from '../interfaces/strengthExercise.interface';
import axios from 'axios';
import Cardio from '../interfaces/cardio.interface';

interface PostDataContextCtxProps {
  addStrengthData: (data: StrengthExercise) => Promise<void>;
  addCardioData: (data: Cardio) => Promise<void>;
}

const PostDataContextCtx = createContext<PostDataContextCtxProps>({
	addStrengthData: async () => {
		return Promise.resolve();
	},
	addCardioData: async () => {
		return Promise.resolve();
	},
});

export default function DataPostContextProvider({ children }: { children: ReactNode }) {

		const addStrengthData = async (data: StrengthExercise) => {
			try {
			const response = await axios.post('http://localhost:3000/strength', data);

			if (response.status !== 200) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			console.log('Dane zostały wysłane', response.data);
			} catch (error) {
			console.error('Błąd podczas wysyłania danych:', error);
			throw error;
			}
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

  return (
    <PostDataContextCtx.Provider value={{ addStrengthData, addCardioData }}>
      {children}
    </PostDataContextCtx.Provider>
  );
}

export { DataPostContextProvider, PostDataContextCtx };
