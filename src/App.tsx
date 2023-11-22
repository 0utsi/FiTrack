import './App.css'
import HistoryMain from './components/History/HistoryMain';
import NavBar from './components/Navbar';
import { Route,Routes } from 'react-router-dom';
import AddPanel from './components/AddExercise/AddPanel';
import Statistics from './components/Statistics/Statistics';
import { DataContextProvider } from './providers/get.DataContextProvider';
function App() {

	return (
	<DataContextProvider>
		<div className='App'>
			<NavBar/>
				<div>
				<Routes>
					<Route path="/addPanel"  element={<AddPanel />} />
					<Route path="/history"  element={<HistoryMain />}/>
					<Route path="/statistics"  element={<Statistics />}/>
				</Routes>
				</div>
		</div>
	</DataContextProvider>
		);
}

export default App;






