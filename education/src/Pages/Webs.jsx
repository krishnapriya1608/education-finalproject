import React, { useEffect, useState } from 'react';
import Coursecard1 from '../Components.jsx/Coursecard1';  // Update the import if needed
import { getallCourses } from '../Service/allAPI';
import { useNavigate } from 'react-router-dom';

function Data() {
  const navigate = useNavigate();
  const [webdevelopmentCourses, setWebdevelopmentCourses] = useState([]);
  const [watchedVideo, setWatchedVideo] = useState(null);  // To store watched video details
  const [courses, setCourses] = useState([]);
  const updateCourseList = (courseId, updatedCourse) => {
    // Your logic to update the course list in the state
    setCourses(prevCourses => {
      return prevCourses.map(course => 
        course._id === courseId ? updatedCourse : course
      );
    });
  };
  const category = "Web development";  // Hardcoded category

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
      console.log(result.data);
  
      if (result.status === 200) {
        const webdevelop = result.data.filter(course => course.category.toLowerCase().includes('web development'));
        setWebdevelopmentCourses(webdevelop);
  
        // Check if any of the web development courses was already watched
        const watchedVideoUrl = localStorage.getItem("watchedVideoUrl");
        if (watchedVideoUrl) {
          const watchedCourse = webdevelop.find(course => {
            // Check if 'course.video' exists before trying to replace
            if (course.video) {
              return `http://localhost:5020/${course.video.replace(/\\/g, '/')}` === watchedVideoUrl;
            }
            return false;
          });
  
          if (watchedCourse) {
            setWatchedVideo(watchedCourse);  // Set the watched video to show on Skills page
          }
        }
      } else {
        console.error("Error fetching courses:", result);
      }
    } catch (error) {
      console.error("API error:", error.response || error.message);
  
      if (error.response && error.response.status === 403) {
        alert("Access denied. Please check your permissions.");
      } else if (error.response && error.response.status === 401) {
        alert("Your session has expired. Please log in again.");
        navigate("/login");
      }
    }
  };
  

  useEffect(() => {
    getAllCourses();
  }, []);
  
  return (
    <div>
      <div>
        <h1 style={{ color: "black", position: "relative", top: "50%", left: "30%" }}>
          All {category} Courses
        </h1>
      </div>
      <div className="content">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "40px" }} className="course">
          {webdevelopmentCourses.length > 0 ? (
            webdevelopmentCourses.map((course) => (
              <Coursecard1 key={course._id} course={course} updateCourseList={updateCourseList} />
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
