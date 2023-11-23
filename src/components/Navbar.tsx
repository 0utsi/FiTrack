import { NavLink } from "react-router-dom";
import '../style/navbar.less'
import { useContext } from "react";
import { DataContextCtx } from "../providers/DataContextProvider";

const NavBar = () => {
	const { update } = useContext(DataContextCtx)
	update()
  return (
    <div className='navbar'>
      <div className='route'>
        <NavLink to="/addPanel" style={({ isActive }) => {
				return {
				fontWeight: isActive ? "bold" : "",
				borderBottom: isActive ? "1px solid black" : "none",
				};
  }} >Add</NavLink>
      </div>
      <div className='route'>
        <NavLink to="/history" style={({ isActive }) => {
				return {
				fontWeight: isActive ? "bold" : "",
				borderBottom: isActive ? "1px solid black" : "none",
				};
  }} >History</NavLink>
      </div>
      <div className='route'>
        <NavLink to="/statistics" style={({ isActive }) => {
				return {
				fontWeight: isActive ? "bold" : "",
				borderBottom: isActive ? "1px solid black" : "none",
				};
  }}>Statistics</NavLink>
      </div>
    </div>
  );
}

export default NavBar;
