import React, { useState, useEffect } from "react";
import Header from "../Components.jsx/Header";
import "../Styles/Courses.css";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FeaturedCourse from '../Components.jsx/FeaturedCourse';
import Populartopic from '../Components.jsx/Populartopic';
import Courselist from '../Components.jsx/Courselist';
import Filters from '../Components.jsx/Filters';

const allCourses = [
  {
    title: "The Complete Data Science Bootcamp From Zero to Hero in Data science",
    instructor: "Jose Portilla, Pierian Training",
    rating: 7.6,
    reviews: 525603,
    details: "22 total hours · 156 lectures · All Levels",
    price: "₹3,099",
    duration: 1,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2RzGeikAnS5cPgbYPavFrQmzbb6FVoTjWPw&s",
    enrolledStudents: ["user1", "user2"], // Example enrolled students
  },
  {
    title: "The Complete 2024 Data Science Development Bootcamp",
    instructor: "Dr. Angela Yu, Developer and Lead Instructor",
    rating: 4.0,
    reviews: 417888,
    details: "61.5 total hours · 373 lectures · All Levels",
    price: "₹3,099",
    duration: 2,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJy_qOfS1b0WuDHOFfV8y0Y02LPYE2c4YQcw&s",
    badge: "Bestseller",
    enrolledStudents: ["user3", "user4"], // Example enrolled students
  },
  {
    title: "The  Data Science Development ",
    instructor: "Dr. Angela Yu, Developer and Lead Instructor",
    rating: 4.0,
    reviews: 417888,
    details: "61.5 total hours · 373 lectures · All Levels",
    price: "₹3,099",
    duration: 2,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz_rLGqrIduC7c3WhZQCx6a6BuU6H6ewrcPA&s",
    badge: "Bestseller",
    enrolledStudents: ["user3", "user4"], // Example enrolled students
  },
  // More course entries...
];

function Courses() {
  const [ratingFilter, setRatingFilter] = useState(0);
  const [durationFilter, setDurationFilter] = useState(null);
  const [dataScienceCourses, setDataScienceCourses] = useState([]);

  const navigate = useNavigate();

  const handleLogin = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); // This should be the _id from localStorage
    const role = localStorage.getItem("role");
  
    if (!token) {
      alert("Please login first.");
      navigate("/auth"); // Navigate to login page if not logged in
      return;
    }
  
    if (role == "teacher") {
      navigate('/data')
      return;
    }
  
    // Get the list of enrolled courses from localStorage
    const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    console.log("Enrolled Courses:", enrolledCourses); // Check if courses are listed here
  
    if (enrolledCourses.length > 0) {
      // Assume we want to check the first course
      const courseId = enrolledCourses[0];
      navigate(`/course/${courseId}`); // Navigate to the enrolled course details page
    } else {
      alert("You are not enrolled in any course.");
    }
  };
  
  
  


  // Filter courses based on rating and duration
  const filteredCourses = allCourses.filter((course) => {
    const matchesRating = course.rating >= ratingFilter;
    const matchesDuration =
      !durationFilter ||
      (durationFilter === "0-1" && course.duration <= 1) ||
      (durationFilter === "1-3" && course.duration > 1 && course.duration <= 3) ||
      (durationFilter === "3-6" && course.duration > 3 && course.duration <= 6) ||
      (durationFilter === "6-17" && course.duration > 6 && course.duration <= 17);
    return matchesRating && matchesDuration;
  });

  return (
    <>
      <div style={{ background: "linear-gradient(to right, rgb(106, 141, 148), rgb(119, 152, 170))" }}>
        <Header />
        <div style={{ gap: "40px", padding: "30px", margin: "70px" }} className="container">
          <div>
          <h1 style={{  fontFamily: "Belanosima", color: "rgb(53, 106, 129)", position: "relative", left: "30%",
}}>Data Science  Courses</h1>            <button
              style={{ position: "relative", left: "920px", bottom: "20px", borderColor: "beige", fontSize: "10px", borderColor: "beige", fontSize: "10px" ,borderRadius:"10px 5px 10px 5px ",backgroundColor:"rgb(56, 114, 141)" }}
              onClick={handleLogin}
            >
              View all
            </button>
          </div>
          <div style={{ gap: "60px" }} className="row">
            {/* Course Cards */}
            {filteredCourses.map((course, index) => (
              <Card key={index} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={course.image} />
                <br />
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <br />
                  <Card.Text>{course.details}</Card.Text>
                  <Button variant="primary">Learn</Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>

        <div className="container">
          <FeaturedCourse />
          <Populartopic />
        </div>

        <div className="main-content">
          <Filters
            setRatingFilter={setRatingFilter}
            setDurationFilter={setDurationFilter}
          />
          <Courselist courses={filteredCourses} />
        </div>
      </div>
    </>
  );
}

export default Courses;
