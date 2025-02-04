import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getQuiz, submitQuiz } from "../Service/allAPI";
import axios from "axios";


const Quiz = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ questions: [] });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(null); // State to store the score

  const navigate = useNavigate();
  const[submit,setSubmit]=useState({
    answers:[],
    quizId:"",
    teacher:""
  });

  // Handle answer selection
  const handleAnswerSelection = (selectedOption) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = selectedOption;
      return updatedAnswers;
    });

    if (currentQuestionIndex < data.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Go back to the previous question
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Fetch quiz data
  const fetchQuiz = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      navigate("/login");
      return;
    }
  
    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  
    try {
      const response = await getQuiz(reqHeader);
      if (response.status === 200 && response.data.length > 0) {
        const quizData = response.data[response.data.length - 1];
        setData(quizData); // Ensure quizId and courseId are included here
        console.log('Quiz Data:', quizData);
      } else {
        console.error("No quiz data available.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const fsubmitQuiz = async () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
  
    if (!token || role !== "student") {
      alert("Session expired. Please log in again.");
      navigate("/auth");
      return;
    }
  
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
  
    const reqBody = {
      answers: selectedAnswers,
      quizId: data._id,
      teacher: data.teacher,
    };
  
    try {
      const response = await submitQuiz(reqBody, reqHeader);
  
      if (response.status === 200) {
        const { score } = response.data;
  
        console.log("Quiz Submitted Successfully!");
        console.log("Score:", score); 
  
        setScore(score); // Store the score in state
  
        alert(`Quiz submitted successfully! Your score is: ${score}`);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error.response?.data || error.message);
  
      if (error.response?.status === 401) {
        alert("Unauthorized: Your session may have expired. Please log in again.");
        navigate("/login");
      } else {
        alert("Error submitting quiz. Please try again.");
      }
    }
  };
  
  

  useEffect(() => {
    fetchQuiz();
  }, []);
 

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5020/api/quizzes/student/score", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setScore(response.data.score);
        console.log("Fetched Score:", response.data.score);
      } catch (error) {
        console.error("Error fetching score:", error);
      }
    };
  
    fetchScore();
  }, []);
  

  return (
    
    <div style={styles.container}>
      <div style={styles.card}>
        <Link style={{ textDecoration: "none" }} to={"/dash"}>
          <h2 style={styles.question}>QUICK QUIZ!</h2>
        </Link>
        <p style={styles.description}>
          Answer the questions below one by one. You can go back to review your answers.
        </p>
  
        {/* Display quizId and courseId */}
        <div style={styles.info}>
          <p style={{fontSize:"13px"}}><strong>Quiz ID:</strong> {data._id || "N/A"}</p>
          <p  style={{fontSize:"13px"}}><strong >Teacher ID:</strong> {data.teacher || "N/A"}</p>
        </div>
  
        <div style={styles.questionContainer}>
          {loading ? (
            <p>Loading questions...</p>
          ) : data?.questions?.length > 0 ? (
            <div>
              <h3 style={styles.questionText}>
                {data.questions[currentQuestionIndex].question}
              </h3>
              <div style={styles.options}>
                {data.questions[currentQuestionIndex].options.map((option, idx) => (
                  <button
                    key={idx}
                    style={styles.ans}
                    onClick={() => handleAnswerSelection(idx)} // Ensure you're passing the index, not the text
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p>No questions available.</p>
          )}
        </div>
        <div style={styles.navigationButtons}>
          <button
            onClick={goToPreviousQuestion}
            style={styles.navButton}
            disabled={currentQuestionIndex === 0}
          >
            Back
          </button>
          {currentQuestionIndex === data.questions.length - 1 ? (
            <button
              onClick={() => fsubmitQuiz({ answers: selectedAnswers })}
              style={styles.navButton}
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              style={styles.navButton}
              disabled={currentQuestionIndex === data.questions.length - 1}
            >
              Next
            </button>
          )}
        </div>
      </div>
      {/* Decorative Items */}
      <div style={styles.decorativeItem1}></div>
      <div style={styles.decorativeItem2}></div>
      <div style={styles.decorativeItem3}></div>
      {score !== null && (
  <div style={{ marginTop: "20px", fontSize: "1.2rem", color: "green" }}>
    <strong>Your Score: {score}</strong>
  </div>
)}

    </div>
  );
  
};

// Add your styles here
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(to bottom, #a8e6cf, #dcedc1)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    padding: "30px",
    width: "400px",
    textAlign: "center",
    zIndex: 2,
  },
  question: {
    fontSize: "1.5rem",
    color: "#00796b",
    marginBottom: "10px",
  },
  description: {
    fontSize: "1rem",
    color: "#757575",
    marginBottom: "20px",
  },
  questionContainer: {
    marginBottom: "20px",
  },
  questionText: {
    fontSize: "1.2rem",
    color: "#00796b",
    marginBottom: "10px",
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  ans: {
    padding: "10px 20px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#4caf50",
    color: "#ffffff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  submitButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "1rem",
    borderRadius: "8px",
    backgroundColor: "#00796b",
    color: "#ffffff",
    border: "none",
    cursor: "pointer",
  },
  decorativeItem1: {
    position: "absolute",
    top: "10%",
    left: "5%",
    width: "50px",
    height: "50px",
    backgroundColor: "#ff8a65",
    borderRadius: "50%",
    zIndex: 1,
  },
  decorativeItem2: {
    position: "absolute",
    bottom: "10%",
    right: "5%",
    width: "100px",
    height: "100px",
    backgroundColor: "#ffd54f",
    borderRadius: "50%",
    zIndex: 1,
  },
  decorativeItem3: {
    position: "absolute",
    top: "30%",
    right: "10%",
    width: "80px",
    height: "80px",
    backgroundColor: "#4db6ac",
    borderRadius: "50%",
    zIndex: 1,
  },
   navButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "1rem",
    borderRadius: "8px",
    backgroundColor: "#00796b",
    color: "#ffffff",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
  },
  navigationButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
};

export default Quiz;
