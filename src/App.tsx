import './App.css'
import Hist from './components/History/Hist';
import NavBar from './components/Navbar';
import { Route,Routes } from 'react-router-dom';
import AddPanel from './components/AddExercise/AddPanel';
function App() {

	return (
		<div className='App'>
			<NavBar/>
				<div>
				<Routes>
					<Route path="/addPanel"  element={<AddPanel />} />
					<Route path="/history"  element={<Hist />}/>
				</Routes>
				</div>
		</div>
		);
}

export default App;






