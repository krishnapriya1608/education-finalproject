import React, { useEffect, useState } from "react";
import "../Styles/Card.css";
import { Form, Button, Modal } from "react-bootstrap";
import { getChallenges, submitAnswer } from "../Service/allAPI";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Import axios here

const Card = ({ title, description }) => {
  const [show, setShow] = useState(false);
  const [challengeId, setChallengeId] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const [challenges, setChallenges] = useState([]);
  const [submittedCount, setSubmittedCount] = useState(0);

  const [answerFile, setAnswerFile] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false); // Track if answered
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  // Fetch challenges when the component mounts
  useEffect(() => {
    const fetchChallenges = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (!token && role === "student") {
        alert("Session expired. Please log in again.");
        navigate("/login");
        return;
      }

      const reqHeader = {
        "Authorization": `Bearer ${token}`,
      };

      try {
        const response = await getChallenges(reqHeader);
        setChallenges(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };

    fetchChallenges();
  }, [navigate]);

  // Fetch submitted assignments count when the component loads
  const fetchSubmittedCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
  
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
  
    try {
      const response = await axios.get("http://localhost:5020/api/daily-challenges/submitted-count", {
        headers: reqHeader,
      });
      console.log("Submitted Count Response:", response.data);  // Log the response here
      setSubmittedCount(response.data.count);
    } catch (error) {
      console.error("Error fetching submitted assignments count:", error);
      setSubmittedCount(0);
    }
  };
  

  useEffect(() => {
    fetchSubmittedCount(); // Fetch the count when the component mounts
  }, []);

  const handleClose = () => {
    setShow(false);
    setChallengeId(null);
    setAnswerText("");
    setAnswerFile(null);
  };

  const handleShow = (id) => {
    setChallengeId(id);
    setShow(true);
  };

  // Submit answer and update the count
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!challengeId) {
      alert("Challenge ID is missing. Please refresh the page and try again.");
      return;
    }

    if (!answerText && !answerFile) {
      alert("Please provide either an answer or upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("answerText", answerText);
    if (answerFile) {
      formData.append("answerFile", answerFile);
    }

    const token = localStorage.getItem("token");
    const reqHeader = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    console.log("Submitting for Challenge ID:", challengeId);
    console.log("Form Data:", { answerText, answerFile });

    try {
      const response = await submitAnswer(challengeId, formData, reqHeader);
      if (response.status === 200) {
        alert("Answer submitted successfully!");
        setIsAnswered(true); // Set answered status to true
        handleClose();

        // Call the fetchSubmittedCount function to update the count after submission
        await fetchSubmittedCount();
      }
    } catch (error) {
      console.error("Error submitting answer:", error.response?.data || error);
      alert("Error submitting the answer. Please try again.");
    }
  };

  const lastChallenge = challenges.length > 0 ? challenges[challenges.length - 1] : null;

  return (
    <div>
      <div className="submitted-count-container">
        <h3>✅ Submitted Assignments: {submittedCount}</h3>
      </div>
      {lastChallenge && (
        <div className="card" key={lastChallenge._id}>
          <div className="icon-placeholder"></div>
          <h3>{lastChallenge.question}</h3>
          <p>{description}</p>
          {isAnswered ? (
            <span className="answered-status">Answered</span> // Display Answered
          ) : (
            <button
              onClick={() => handleShow(lastChallenge._id)}
              className="btn-learn-more"
            >
              Take the Challenge
            </button>
          )}
        </div>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {lastChallenge?.question || "Submit Your Answer"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Challenge ID (Read-Only) */}
            <Form.Group controlId="challengeId">
              <Form.Label>Challenge ID</Form.Label>
              <Form.Control
                type="text"
                value={challengeId || ""}
                placeholder="Challenge ID"
                readOnly
              />
            </Form.Group>
            {/* Teacher ID (Read-Only) */}
            <Form.Group controlId="teacherId" className="mt-3">
              <Form.Label>Teacher ID</Form.Label>
              <Form.Control
                type="text"
                value={lastChallenge?.teacher || ""}
                placeholder="Teacher ID"
                readOnly
              />
            </Form.Group>
            {/* Student ID (Read-Only) */}
            <Form.Group controlId="studentId" className="mt-3">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                type="text"
                value={user?._id || ""}
                placeholder="Student ID"
                readOnly
              />
            </Form.Group>
            {/* Answer Text */}
            <Form.Group controlId="answerText" className="mt-3">
              <Form.Label>Answer</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="Enter your answer"
              />
            </Form.Group>
            {/* Answer File Upload */}
            <Form.Group controlId="answerFile" className="mt-3">
              <Form.Label>Upload File</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setAnswerFile(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit Answer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Card;
