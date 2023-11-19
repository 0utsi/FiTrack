import { NavLink } from "react-router-dom";
import '../style/navbar.less'

const NavBar = () => {
  return (
    <div className='navbar'>
      <div className='route'>
        <NavLink to="/addPanel" activeClassName="selected">Add</NavLink>
      </div>
      <div className='route'>
        <NavLink to="/history" activeClassName="active">History</NavLink>
      </div>
      <div className='route'>
        <NavLink to="/statistics" activeClassName="active">Statistics</NavLink>
      </div>
    </div>
  );
}

export default NavBar;
