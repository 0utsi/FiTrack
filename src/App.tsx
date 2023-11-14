import './App.css'
import Hist from './components/History/Hist';
import AddCardio from './components/AddCardio';
import NavBar from './components/navbar';
import { Route,Routes } from 'react-router-dom';
function App() {

	return (
		<div className='App'>
			<NavBar/>
				<div>
				<Routes>
					<Route path="/addcardio"  element={<AddCardio/>} />
					<Route path="/history"  element={<Hist />}/>
				</Routes>
				</div>
		</div>
		);
}

export default App;






