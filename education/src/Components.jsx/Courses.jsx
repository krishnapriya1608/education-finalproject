import React from 'react'
import '../Styles/Progress.css'

function Courses() {
  return (
    <div>


<div className="popular-courses">
  <h3>Popular Courses</h3>
  <div className="course-card">
    <div className="icon">U</div>
    <div className="info">
      <h4>UI/UX Design</h4>
      <p>30+ Courses</p>
    </div>
    <button>View Courses</button>
  </div>
  <div className="course-card">
    <div className="icon">M</div>
    <div className="info">
      <h4>Marketing</h4>
      <p>25+ Courses</p>
    </div>
    <button>View Courses</button>
  </div>
  <div className="course-card">
    <div className="icon">W</div>
    <div className="info">
      <h4>Web Development</h4>
      <p>30+ Courses</p>
    </div>
    <button>View Courses</button>
  </div>
  <div className="course-card">
    <div className="icon">M</div>
    <div className="info">
      <h4>Mathematics</h4>
      <p>50+ Courses</p>
    </div>
    <button>View Courses</button>
  </div>
</div>

    </div>
  )
}

export default Courses

