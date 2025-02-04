import React from "react";
import "../Styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="profile">
        <img src="https://via.placeholder.com/100" alt="Profile" className="profile-pic" />
        <h3>Course Course</h3>
        <p>⭐⭐⭐⭐⭐</p>
      </div>
      <ul style={{display:"flex"}} className="sidebar-menu">
        <li>📋 Co Courses</li>
        <li>✏️ Edit</li>
        <li>❓ Quiz Notes</li>
        <li>📂 Assignments</li>
        <li>✔️ Achievements</li>
      </ul>
    </div>
  );
};

export default Sidebar;
