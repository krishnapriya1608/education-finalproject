import React, { useEffect, useState } from "react";
import "../Styles/Skill.css";
import { Link } from "react-router-dom";

const Skills = () => {
  const [watchedVideo, setWatchedVideo] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    // Retrieve enrolled courses from localStorage
    const enrolled = JSON.parse(localStorage.getItem("enrolledCategories")) || [];
    setEnrolledCourses(enrolled);

    // Retrieve watched video details from localStorage
    const videoUrl = localStorage.getItem("videoUrl");
    const videoName = localStorage.getItem("videoTitle");
    const videoDescription = localStorage.getItem("videoDescription");

    if (videoUrl && enrolled) {
      setWatchedVideo({
        url: videoUrl,
        name: videoName || "Unknown Video",
        description: videoDescription || "No description available",
      });
    }
  }, []);

  return (
    <div className="dashboard">
      <main className="main">
        <header>
          <Link style={{ textDecoration: "none", position: "relative", left: "30%" }} to={'/dash'}>
            <h1 style={{ color: "rgb(17, 93, 126)", position: "relative", left: "40%", fontFamily: "Arima" }}>
              Watch History
            </h1>
          </Link>
        </header>
        <div style={{ width: "100%", height: "800px", backgroundColor: "rgb(94, 130, 130)" }}>
          {watchedVideo ? (
            <div>
              <h2 style={{ fontSize: "18px", color: "rgb(30, 99, 137)", marginLeft: "20px", position: "relative", top: "40px", fontFamily: "Arima" }}>
                Last Watched Video:
              </h2>
              <h3 style={{ color: "rgb(26, 99, 142)", position: "relative", top: "40px", left: "20px", fontFamily: "Merienda" }}>
                Video: {watchedVideo.name}
              </h3>
              <p style={{ color: "rgb(19, 94, 137)", position: "relative", top: "40px", left: "20px", fontFamily: "Arima" }}>
                Description: {watchedVideo.description}
              </p>
              <video style={{ position: "relative", top: "40px", left: "20px" }} width="500" controls>
                <source src={watchedVideo.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <p>No video watched yet.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Skills;
