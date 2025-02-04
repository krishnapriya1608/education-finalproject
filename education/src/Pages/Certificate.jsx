import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/Certificate.css"; 
import { Link } from "react-router-dom";
import Header from "../Components.jsx/Header";

const Certificate = () => {
  const [certifiedCourses, setCertifiedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertifiedCourses = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        
        const response = await axios.get("http://localhost:5020/api/courses/certified", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : "", // Send token only if available
          },
        });
  
        setCertifiedCourses(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };
  
    fetchCertifiedCourses();
  }, []);
  

  return (
    <>
      <div style={{ background: "linear-gradient(rgb(161, 180, 196),rgb(36, 78, 123))", marginBottom: "40px" }}>
        <Header />
        <div style={{ marginBottom: "90px" }} className="certification-container">
          <section className="certification-header">
            <h2>Certified Courses</h2>
            <p>Explore our list of certified courses and enhance your skills.</p>
          </section>

          {/* Loading State */}
          {loading && <p>Loading certified courses...</p>}

          {/* Error State */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Display Certified Courses */}
          <section className="certification-list">
            {certifiedCourses.length > 0 ? (
              <div className="issuers-grid">
                {certifiedCourses.map((course, index) => (
                  <div key={index} className="issuer-card">
                    <h4>{course.name}</h4>
                    <p className="learners-count">Instructor: {course.instructor}</p>
                    <p className="issuer-description">{course.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              !loading && <p>No certified courses available.</p>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Certificate;
