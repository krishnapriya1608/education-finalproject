import React, { useState } from "react";
import Header from "../Components.jsx/Header";
import "../Styles/Courses.css";
import Filters from '../Components.jsx/Filters'
import Populartopic from "../Components.jsx/Populartopic";
import FeaturedCourse from "../Components.jsx/FeaturedCourse";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Courselist from "../Components.jsx/Courselist";
import axios from "axios";




const courses = [

  {
    title: "Web Study",
    image: "https://media.licdn.com/dms/image/v2/D5612AQHyLFkv9YBcGA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1715058774193?e=2147483647&v=beta&t=7yqv62DbvJWPvycGiDX4FGb79GOPsVB_dreB-SHh36E",
    button:"see more"
  },
  {
    title: "Web Bootcamp",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiYVA5LbzTYWQcwQGEG7F87WFa3YYTWFZKa1aWQNsL5sr9GGy2xhKE_FYF6nW9jqDkjdQ&usqp=CAU",
    button:"see more"
  },
  {
    title: "Web Camp [2024]",
    image: "https://cdn.prod.website-files.com/6344c9cef89d6f2270a38908/673f2a3b44c1ed4901bb43bb_6386328bea96dffacc89946b_d1.webp",
    button:"see more"
  },
  {
    title: "Web Development [2024]",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0jQPcLR2zDp6yPjuN6OqywK4v0ybNPxu1kw&s",
    button:"see more"
  },
];
const allCourses = [ {
  title: "Web Study",
  image: "https://media.licdn.com/dms/image/v2/D5612AQHyLFkv9YBcGA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1715058774193?e=2147483647&v=beta&t=7yqv62DbvJWPvycGiDX4FGb79GOPsVB_dreB-SHh36E",
  button:"see more"
},
{
  title: "Web Bootcamp",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiYVA5LbzTYWQcwQGEG7F87WFa3YYTWFZKa1aWQNsL5sr9GGy2xhKE_FYF6nW9jqDkjdQ&usqp=CAU",
  button:"see more"
},
{
  title: "Web Camp [2024]",
  image: "https://cdn.prod.website-files.com/6344c9cef89d6f2270a38908/673f2a3b44c1ed4901bb43bb_6386328bea96dffacc89946b_d1.webp",
  button:"see more"
},
{
  title: "Web Development [2024]",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0jQPcLR2zDp6yPjuN6OqywK4v0ybNPxu1kw&s",
  button:"see more"
},
];


function Web() {
  const navigate=useNavigate()
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

    const handleLogin = async () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user"); // Retrieve the full user object (as a string)
      const role = localStorage.getItem("role");
    
      if (!token) {
        alert("Please login first.");
        navigate("/auth"); // Navigate to login page if not logged in
        return;
      }
    
      if (!userData) {
        alert("No user data found.");
        navigate("/auth"); // Navigate to login page if user data is missing
        return;
      }
    
      // Parse the user data to extract the user ID (_id)
      const user = JSON.parse(userData);
      const userId = user._id;  // Extract the _id from the parsed user object
    
      if (role === "teacher") {
        navigate('/webs'); // Redirect teachers to webs page
        return;
      }
    
      // Fetch the list of enrolled courses from the backend
      try {
        const response = await axios.get(`http://localhost:5020/api/enrollments/enrollments/${userId}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
    
        const enrolledCourses = response.data; // Assuming response is an array of enrolled course objects
        console.log("Enrolled Courses:", enrolledCourses);
    
        if (enrolledCourses.length > 0) {
          // Assuming the first enrolled course is the one to navigate to
          const courseId = enrolledCourses[0].category; // Assuming category represents the course ID
          navigate(`/course/${courseId}`); // Navigate to the course details page
        } else {
          alert("You are not enrolled in any course.");
        }
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        alert("Failed to fetch enrolled courses.");
      }
    };
    
    
    
  return (
    <>
    <div style={{ background: "linear-gradient(rgb(134, 183, 194), rgb(213, 226, 233))" }}>
        <Header />
        <div style={{ gap: "40px", padding: "30px", margin: "70px" }} className="container">
          <div>
            <h1 style={{  fontFamily: "Belanosima", color: "rgb(53, 106, 129)", position: "relative", left: "30%",
}}>Web Development  Courses</h1>

            {/* Remove Link and use conditional rendering for button */}
            <button
              style={{ position: "relative", left: "920px", bottom: "20px", borderColor: "beige", fontSize: "10px" ,borderRadius:"10px 5px 10px 5px ",backgroundColor:"rgb(56, 114, 141)"}}
              onClick={handleLogin}
            >
              View all
            </button>
          </div>
          <div style={{ gap: "60px",marginTop:"40px" }} className="row">
            {/* Course Cards */}
            <Card style={{ width: '18rem', gap: "40px" }}>
              <Card.Img variant="top"   src= "https://media.licdn.com/dms/image/v2/D5612AQHyLFkv9YBcGA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1715058774193?e=2147483647&v=beta&t=7yqv62DbvJWPvycGiDX4FGb79GOPsVB_dreB-SHh36E"
 />
              <Card.Body>
                <Card.Title>Web development and Prepare</Card.Title>
                <Card.Text>Navigating different Web development roles</Card.Text>
                <Button variant="primary">Learn</Button>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
    <Card.Img variant="top"src= "https://cdn.prod.website-files.com/6344c9cef89d6f2270a38908/673f2a3b44c1ed4901bb43bb_6386328bea96dffacc89946b_d1.webp" />
    <br />
    <Card.Body>
      <Card.Title>Data Science with ML</Card.Title>
      <br />
      <Card.Text>
        Strategies, skills, techniques, and tools
      </Card.Text>
      <Button variant="primary">Learn</Button>
    </Card.Body>
  </Card>

  <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyIcaqiLpUZTYmtoN6rkJJdO-PyvcliOyrOybdaMQfThhUbjdJZsAyMnMzLOck6KEYm6I&usqp=CAU" />
    <br />
    <Card.Body>
      <Card.Title>Data Science Challenging</Card.Title>
      <br />
      <Card.Text>
        Striving for high accuracy across the entire dataset
      </Card.Text>
      <Button variant="primary">Learn</Button>
    </Card.Body>
  </Card>

             </div>
        </div>

        <div className="container">
          {/* Other components */}
        </div>

        <div className="content">
          <h1 style={{ color: "white" }}>Data Science Courses</h1>
          <div>
            <p style={{ color: "white" }}>Explore courses from experienced, real-world experts.</p>
          </div>
        </div>

        <div className="main-content">
          {/* More components */}
        </div>
      
      <div className="container">
          <FeaturedCourse />
          <Populartopic />
        </div>

        <div className="content">
          <h1 style={{ color: "white" }}>Data Science Courses</h1>
          <div>
            <p style={{ color: "white" }}>Explore courses from experienced, real-world experts.</p>
          </div>
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

export default Web;
