import { Link } from "react-router-dom"
import '../style/navbar.less'

const NavBar = () => {

	return (
		<div className='navbar'>
			<div className='route'>
				<Link to="/addPanel">Add</Link>
			</div>
			<div className='route'>
				<Link to="/history">History</Link>
		</div>
			<div className='route'>
				<Link to="/statistics">Statisctics</Link>
			</div>
		</div>
)

}

export default NavBar;