import React from 'react'
import { NavLink } from 'react-router';

const AdminNavbar = () => {
  return (
      <div className='nav-design'>
      <nav>
    <div className="nav-center">
    <NavLink to='/admin/home' className="link-design">Home</NavLink>
    <NavLink to='/admin/addfood' className="link-design">Manage Food</NavLink>
    <NavLink to='/admin/viewOrder' className="link-design">viewOrder</NavLink>
  </div>
    </nav>
    </div>
  )
}

export default AdminNavbar;
