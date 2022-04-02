import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className='header'>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/add-people'>add people</NavLink>
    </div>
  );
}

export default Header;
