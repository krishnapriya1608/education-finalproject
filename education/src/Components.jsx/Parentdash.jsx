import React from "react";
import "../Styles/Parent.css";

function Parentdash() {
  return (
    <div className="dashboard-content">
      <header className="dashboard-header">
        <h1>Parent's Dashboard</h1>
        <div className="search-bar">
          <input style={{backgroundColor:"white"}} type="text" placeholder="Search here..." />
        </div>
      </header>

      <div  className="stats">
        <div className="stat-card blue">
          <h3>Course in Progress</h3>
          <p>18</p>
        </div>
        <div className="stat-card purple">
          <h3>Course Completed</h3>
          <p>76</p>
        </div>
        <div className="stat-card orange">
          <h3>Certificates</h3>
          <p>26</p>
        </div>
      </div>

      <div style={{marginTop:"20px"}} className="main-section">
        <div className="time-spending">
          <h3>Time Spending</h3>
          <p>Graph here</p>
        </div>

        <div className="schedule">
          <h3>Upcoming Schedule</h3>
          <ul>
            <li>Basic Algorithm - 27 Jan, 2023</li>
            <li>Machine Learning - 17 Jan, 2023</li>
            <li>Python - 17 Jan, 2023</li>
          </ul>
        </div>

        <div  className="courses">
          <h3>My Courses</h3>
          <ul>
            <li>Web Development - 23 Feb, 2023</li>
            <li>Data Science - 14 Jan, 2023</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Parentdash;
