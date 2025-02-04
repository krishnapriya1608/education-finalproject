import React from "react";
import { useLocation } from "react-router-dom";

const QuizResult = () => {
  const location = useLocation();
  const { score, quizId, teacher } = location.state || {};

  if (!location.state) {
    return <div>No quiz result found. Please complete a quiz first.</div>;
  }

  return (
    <div style={styles.container}>
      <h2>Quiz Result</h2>
      <div style={styles.resultCard}>
        <p><strong>Quiz ID:</strong> {quizId}</p>
        <p><strong>Teacher ID:</strong> {teacher}</p>
        <p><strong>Your Score:</strong> {score} out of 10</p> {/* Adjust based on your quiz */}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(to bottom, #a8e6cf, #dcedc1)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  resultCard: {
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    padding: "30px",
    width: "400px",
    textAlign: "center",
  },
};

export default QuizResult;