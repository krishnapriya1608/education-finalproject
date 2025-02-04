import React from "react";
import "../Styles/Parent.css";
import { Link } from "react-router-dom";


function Teacherside() {
  return (
    <div   className="sideebar">
      <h2 className="brand">edeze</h2>
      <ul className="menu">
        <Link style={{textDecoration:"none"}} to={'/dash'}><li style={{color:"black"}} className="menu-item active">Dashboard</li>
        </Link>
        <li style={{color:"black"}} className="menu-item">Student Details</li>
        <li style={{color:"black"}} className="menu-item">Messages</li>
        <li style={{color:"black"}} className="menu-item">Time</li>
        <li style={{color:"black"}} className="menu-item">Teacher</li>
        <li style={{color:"black"}} className="menu-item">Settings</li>
      </ul>
      <div className="sidebar-footer">



        <p>Edeze for Mobile</p>
        <button className="download-btn">Download Now</button>
      </div>
    </div>
  );
}

export default Teacherside;
