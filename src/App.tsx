import './App.css'
import History from './components/History/History';
import NavBar from './components/Navbar';
import { Route,Routes } from 'react-router-dom';
import AddPanel from './components/AddExercise/AddPanel';
import Statistics from './components/Statistics/Statistics';
function App() {

	return (
		<div className='App'>
			<NavBar/>
				<div>
				<Routes>
					<Route path="/addPanel"  element={<AddPanel />} />
					<Route path="/history"  element={<History />}/>
					<Route path="/statistics"  element={<Statistics />}/>
				</Routes>
				</div>
		</div>
		);
}

export default App;






