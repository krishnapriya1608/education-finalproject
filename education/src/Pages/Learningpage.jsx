import React, { useEffect, useState } from "react";
import Card from "../Components.jsx/Card";
import "../Styles/Learning.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import { getChallenges } from "../Service/allAPI";

const LearningPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [submittedCount, setSubmittedCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChallenges = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (!token || role !== "student") {
        alert("Session expired. Please log in again.");
        navigate("/login");
        return;
      }

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await getChallenges(reqHeader);
        setChallenges(response.data);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };

    fetchChallenges();
  }, [navigate]);

  

  return (
    <>
      <div style={{ backgroundColor: "rgb(129, 38, 134)" }} className="learning-page">
        <div className="header">
          <Link style={{ textDecoration: "none" }} to={"/dash"}>
            <h1>Hands-On Learning</h1>
          </Link>
          <p>
            Dive deep into the world of design through practical, hands-on tutorials that
            take you step-by-step through the creative process.
          </p>
        </div>

        {/* Display Submitted Assignments Count */}
       

        <div className="content">
          <div style={{ display: "flex", gap: "20px" }} className="cards">
            {challenges.map((challenge) => (
              <Card key={challenge._id} title={challenge.question} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default LearningPage;