import React from 'react';
import { NavLink } from 'react-router-dom';


const Navbar = () => {
  return (
    <div className="navbar">
      <h1 className="logo">NOTEAPP</h1>
      <ol className="nav-links">
        <li><NavLink to="/" className="nav-link">Home</NavLink></li>
        <li><NavLink to="/note" className="nav-link">Note</NavLink></li>
        <li><NavLink to="/addnote" className="nav-link">Add Note</NavLink></li>
        <li><NavLink to="/login" className="nav-link">Login</NavLink></li>
        <li><NavLink to="/register" className="nav-link">Register</NavLink></li>
      </ol>
    </div>
  );
};

export default Navbar;
