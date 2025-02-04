import React, { useState } from "react";
import Header from "../Components.jsx/Header";
import Mobilecard from "../Components.jsx/Mobilecard";
import "../Styles/Courses.css";
import FeaturedCourse from '../Components.jsx/FeaturedCourse'
import Populartopic from '../Components.jsx/Populartopic'
import Filters from '../Components.jsx/Filters'
import { BsDisplay } from "react-icons/bs";
import Mobiledevelopment from "../Components.jsx/Mobiledevelopment";


const courses = [

  {
    title: "R Level 1 - Data Analytics with R",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8fkUao-ScQqZ1qyvS6VTaQcUao99q1CdQ8m_zBn0pfgKWw6wdOTbn-6CTXxVqW8DMmU&usqp=CAU",
  },
  {
    title: "Regression Analysis / Data Analytics in Regression",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz_rLGqrIduC7c3WhZQCx6a6BuU6H6ewrcPA&s",
  },
  {
    title: "Data Science A-Z: Hands-On Exercises & ChatGPT Prize [2024]",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSQP_x9y2Q5RV0XbojJp7oowNIqaapAjT40A&s",
  },
];
const allCourses = [
  {
    title: "The Complete Python Bootcamp From Zero to Hero in Python",
    instructor: "Jose Portilla, Pierian Training",
    rating: 7.6,
    reviews: 525603,
    details: "22 total hours · 156 lectures · All Levels",
    price: "₹3,099",
    duration: 1,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8h_BUGp_0Yxt_QUeBeMu32g4kvJ6deNMW5g&s",
  },
  {
    title: "The Complete 2024 Web Development Bootcamp",
    instructor: "Dr. Angela Yu, Developer and Lead Instructor",
    rating: 4.0,
    reviews: 417888,
    details: "61.5 total hours · 373 lectures · All Levels",
    price: "₹3,099",
    duration: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvQ_A1YpPDcscDaiVTYKnCVn2foc3piDKWXg&s",
    badge: "Bestseller",
  },
  {
    title: "100 Days of Code: The Complete Python Pro Bootcamp",
    instructor: "Dr. Angela Yu",
    rating: 3.7,
    reviews: 342316,
    details: "56.5 total hours · 592 lectures · All Levels",
    price: "₹3,299",
    duration: 3,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqMGQGC_G75A7IaddJd5ekLT1lVfsLRet_iA&s",
    badge: "Bestseller",
  },
];



function Mobile() {
  const [ratingFilter, setRatingFilter] = useState(0);
  const [durationFilter, setDurationFilter] = useState(null);

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
    
      <Header />
      <div className="content">
        <h1>Data Science Courses</h1>
        <p>Explore courses from experienced, real-world experts.</p>
        <div className="tabs">
          <span className="active-tab">Most popular</span>
          <span>Trending</span>
        </div>
        <div className="course">
          {courses.map((course, index) => (
            <Mobilecard key={index} title={course.title} image={course.image} />
          ))}
        </div>
      </div>

      <div  className=" container  ">
        <FeaturedCourse  />
        <Populartopic />
      </div>   
      <div className="content">
        <h1>Data Science Courses</h1>
        <div>
        <p>Explore courses from experienced, real-world experts.</p></div>
      </div>

      <div className="main-content">
        <Filters
          setRatingFilter={setRatingFilter}
          setDurationFilter={setDurationFilter}
        />
        <Mobiledevelopment  courses={filteredCourses} />
      </div>
       </>
  );
}

export default Mobile;
