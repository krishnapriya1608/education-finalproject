import React from "react";
import { Link } from "react-router-dom";


const Achievements = () => {
  const stats = [
    { percentage: "Quiz", description: "Crack a subject based quiz" },
    { percentage: "Learning", description: "Consistent Learner with 50 points daily" },
    { percentage: "Coding", description: "Coding competition winner." },
    { percentage: "Reward", description: "Rewards on completing challenges." },
  ];

  return (
    
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <Link style={{ textDecoration:"none"}}  to={'/dash'}><h1  style={styles.title}>Achievements</h1>
          </Link>
          <p style={styles.subtitle}>
            We work For your Achievements
          </p>
        </div>
        <div style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <div key={index} style={styles.statBox}>
              <h2 style={styles.percentage}>{stat.percentage}</h2>
              <p style={styles.description}>{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundImage: 'url(https://cdn.pixabay.com/photo/2022/06/24/12/41/achievement-7281630_640.png)',
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    // background: `
    //   linear-gradient(to bottom, rgb(38, 69, 167) 0%, rgba(255, 255, 255, 1) 55%,rgba(70, 93, 169, 1)100%, rgba(255, 255, 255, 1)  100%)`,
    textAlign: "center",
    height: "auto",
    minHeight: "100vh"
  },
  content: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "40px",
    color: "white",
  },
  title: {
    fontSize: "2rem",
    margin: "0",
    color: "rgba(2, 7, 21, 0.76)",
    fontWeight:"bolder",
    marginBottom:"40px",
   
  },
  subtitle: {
    fontSize: "1rem",
    marginTop: "10px",
    color: "rgba(3, 30, 61, 0.8)",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
  },
  statBox: {
    backgroundColor: "rgba(85, 117, 153, 0.8)",
    padding: "20px",
    borderRadius: "10px",
    width: "150px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    color: "#2C2F48",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  statBoxHover: {
    transform: "scale(1.05)",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
  },
  percentage: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: "0",
  },
  description: {
    fontSize: "0.9rem",
    marginTop: "10px",
  },
};

export default Achievements;




