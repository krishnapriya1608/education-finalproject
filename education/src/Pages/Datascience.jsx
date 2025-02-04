import React, { useEffect, useState } from 'react';
import Coursecard from '../Components.jsx/Coursecard';
import { getallCourses } from '../Service/allAPI';
import { useNavigate } from 'react-router-dom';

function Data() {
  const navigate = useNavigate();
  const [dataScienceCourses, setDataScienceCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const category = "Data Science";  // Hardcoded category
  const updateCourseList = (courseId, updatedCourse) => {
    // Your logic to update the course list in the state
    setCourses(prevCourses => {
      return prevCourses.map(course => 
        course._id === courseId ? updatedCourse : course
      );
    });
  };
  const getAllCourses = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  
    const reqHeader = {
      "Content-Type": "multipart/form-data",  // Fix content-type here
      "Authorization": `Bearer ${token}`,
    };
  
    try {
      const result = await getallCourses(reqHeader);
      console.log(result.data);  // This will show the structure of each course object
  
      if (result.status === 200) {
        const dataScience = result.data.filter(course => course.category.toLowerCase().includes('data science'));
        setDataScienceCourses(dataScience);
      } else {
        console.error("Error fetching courses:", result);
      }
    } catch (error) {
      console.error("API error:", error.response || error.message);
    }
  };
  
  
  useEffect(() => {
    getAllCourses();
  }, []);
  
  return (
    <div style={{backgroundColor:"black"}}>
      <div  >
        <h1 style={{ color:"rgb(81, 132, 158) ", position: "relative", top: "50%", left: "30%",fontWeight:"bold"}}>
          All {category} Courses
        </h1>
      </div>
      <div className="content">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "40px" ,backgroundColor:"black"}} className="course">
          {dataScienceCourses.length > 0 ? (
            dataScienceCourses.map((course) => (
              <Coursecard  key={course._id} course={course} updateCourseList={updateCourseList} />
            ))
          ) : (
            <p>No courses found for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Data;
