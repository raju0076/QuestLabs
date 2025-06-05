import React from 'react'
import '../styles/Nav.css'
import { Link } from "react-router-dom";
export const Nav = () => {
  return (
    <div className="navbar">
  <Link to="/home">Home</Link>
  <Link to='/users'>Profiles</Link>
  <Link to="/form">Add Profiles</Link>
</div>

  )
}
