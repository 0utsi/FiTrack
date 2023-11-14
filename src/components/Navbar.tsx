import { Link } from "react-router-dom"
import '../style/navbar.less'

const NavBar = () => {



	return (
		<div className='navbar'>
			<div className='route'>
				<Link to="/addcardio">Add</Link>
			</div>
			<div className='route'>
				<Link to="/history">History</Link>
		</div>
			<div className='route'>
				<Link to="/stat">Statisctic</Link>
			</div>
		</div>
)

}

export default NavBar;