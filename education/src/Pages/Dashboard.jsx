import React, { useEffect, useState } from "react";
import axios from "axios";
import Performance from "../Components.jsx/Performance";
import Calendar from "../Components.jsx/Calendar";
import Teachers from "../Components.jsx/Teachers";
import ErrorBoundary from "../Components.jsx/Errorboundary";
import Events from "../Components.jsx/Events";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [score, setScore] = useState(null);


  const [userName, setUserName] = useState("");
  const [quizResults, setQuizResults] = useState([]);
  const [studentId, setStudentId] = useState(null); // Use state for student ID

  useEffect(() => {
    // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserName(user.name);
      setStudentId(user.id); // Correctly setting student ID
    }
  }, []);
 
  useEffect(() => {
    const fetchScore = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5020/api/quizzes/student/score", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setScore(response.data.score);
        console.log("Dashboard Score:", response.data.score);
      } catch (error) {
        console.error("Error fetching score:", error);
      }
    };
  
    fetchScore();
  }, []);
  

  return (
    <>
      

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "20px",
          color: "#fff",
          backgroundColor: "#1A1C30",
        }}
        
      >
        
          <div style={{width:"200px",height:"100px",backgroundColor:"rgb(105, 137, 185)",borderRadius:"5px 10px 5px 10px"}}>
      {score !== null ? (
        <h3 style={{fontSize:"13px",position:"relative",top:"30px",left:"10%"}}>Your Last Quiz Score: <br /> <p style={{marginLeft:"60px",marginTop:"10px"}}>{score}</p> </h3>
      ) : (
        <p>No quiz results found.</p>
      )}
    </div>
        {/* Search Bar */}
        {/* <input
          style={{ width: "350px", marginLeft: "370px" }}
          type="search"
          placeholder="Search your course"
        /> */}

        {/* Top Section */}
        <div style={{ display: "flex" }}>
          <div
            style={{
              marginBottom: "10px",
              marginLeft: "40px",
              display: "flex",
              borderRadius: "31px",
              width: "590px",
              height: "200px",
              backgroundColor: "rgb(70, 93, 169)",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "40px",
              position: "relative",
              left: "5%",
            }}
          >
            <div>
              <h1 style={{ textAlign: "center", fontSize: "18px" }}>
                Welcome, {userName}
              </h1>
              <p style={{ marginLeft: "30px" }}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam ad
                placeat labore.
              </p>
            </div>
            <div>
              <img
                width="200px"
                height="230px"
                style={{ borderRadius: "31px", marginBottom: "20px" }}
                src="https://www.digitronkids.com/assets/images/young-friends.png"
                alt="Student"
              />
            </div>
          </div>

          {/* Calendar */}
          <div style={{ width: "350px", marginLeft: "60px" }}>
            <Calendar />
          </div>
        </div>

        {/* Performance Section */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "space-between",
          }}
        >
          <ErrorBoundary>
            <div style={{ flex: "1 1 30%", minWidth: "300px", position: "relative", bottom: "350px" }}>
              <Performance />
            </div>
          </ErrorBoundary>
        </div>

        {/* Teachers Section */}
        <div style={{ width: "430px", position: "relative", bottom: "28%", right: "2%" }}>
          <Teachers />
        </div>

        {/* Events Section */}
        <div style={{ width: "430px"}}>
          <Events />
        </div>

        {/* Bottom Section */}
        <div
          style={{
            display: "flex",
            position: "relative",
            bottom: "950px",
            justifyContent: "space-evenly",
          }}
        >
          {/* Course Enrolled */}
          <div
            style={{
              width: "350px",
              height: "310px",
              borderRadius: "20px",
              marginLeft: "10px",
              backgroundColor: "rgb(70, 93, 169)",
            }}
          >
            <p
              style={{
                marginLeft: "70px",
                marginTop: "70px",
                fontSize: "20px",
                color: "rgb(162, 170, 174)",
                fontWeight: "bold",
              }}
            >
              Course Enrolled <br /> <br /> Web Development (Enrolled on 24/12/2024)
            </p>
            <Link to={"/web"}>
              <button
                style={{
                  marginLeft: "130px",
                  marginTop: "10px",
                  borderRadius: "10px",
                  borderColor: "transparent",
                }}
              >
                Go there
              </button>
            </Link>
          </div>

          {/* Recent Activity */}
          <div
            style={{
              marginTop: "10px",
              padding: "20px",
              backgroundColor: "#222",
              borderRadius: "10px",
              width: "350px",
              height: "300px",
              backgroundColor: "rgb(70, 93, 169)",
              position: "relative",
              bottom: "500px",
              right: "300px",
            }}
          >
            <h2
              style={{
                color: "rgb(220, 232, 232)",
                fontSize: "20px",
                marginLeft: "60px",
                fontWeight: "bold",
              }}
            >
              Recent Activity
            </h2>
            <ul style={{ listStyleType: "none", padding: "0" }}>
              <li>🎬 Watched "React Basics" on 31 Dec 2024</li>
              <br />
              <li>📅 Attended "Web Development Workshop" on 30 Dec 2024</li>
              <br />
              <li>✅ Submitted "Assignment 5" on 29 Dec 2024</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
