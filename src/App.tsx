import './App.css'
import HistoryMain from './components/History/HistoryMain';
import NavBar from './components/Navbar';
import { Route,Routes } from 'react-router-dom';
import AddPanel from './components/AddExercise/AddPanel';
import Statistics from './components/Statistics/Statistics';
import { GetDataContextProvider } from './providers/DataGetContextProvider';
import  PostDataContextProvider  from './providers/DataPostContextProvider'
function App() {

	return (
	<GetDataContextProvider>
		<PostDataContextProvider>
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
		</PostDataContextProvider>
	</GetDataContextProvider>
		);
}

export default App;






