import React, { useState } from "react";
import "../Styles/CourseCard1.css";
import { Button, Card, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Coursecard1({ course, updateCourseList }) {
  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
  const [currentVideoUrl, setCurrentVideoUrl] = useState(""); // State to store current video URL to play
  const [role, setRole] = useState(localStorage.getItem("role")); // Storing role (teacher/student)
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);  const videoUrl = course.video ? `http://localhost:5020/${course.video.replace(/\\/g, '/')}` : "";
  const videoTitle = course.name;
  const videoDescription = course.description;

  const teacherName = course.teacher?.name || "Unknown Instructor";
  const teacherEmail = course.teacher?.email || "No Email Available";

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
    setCurrentVideoUrl(""); // Clear the current video URL when closing modal
  };

  // Edit modal related state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedCourse, setEditedCourse] = useState(course);

  // Function to handle the opening of the edit modal
  const handleEditClick = () => {
    setEditedCourse(course); // Load current course data into the edit form
    setShowEditModal(true);
  };

  // Function to close the edit modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  // Function to handle form submission for editing the course
  const handleEditSubmit = async () => {
    const token = localStorage.getItem('token');
    const courseId = course._id;
  
    try {
      const response = await axios.put(
        `http://localhost:5020/api/courses/api/courses/${courseId}`,
        editedCourse, // Send the updated course details
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Edit response:', response);
  
      // Call updateCourseList passed from the parent component
      updateCourseList(courseId, response.data.course);
  
      alert("Course updated successfully.");
      setShowEditModal(false); // Close the edit modal
    } catch (error) {
      console.error('Edit error:', error);
      alert("Error updating the course. Please try again.");
    }
  };
  

  // Function to handle field changes in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  // Open the modal and set the video URL
  const handleWatchVideo = () => {
    if (videoUrl) {
      // Store the video URL, title, and description in localStorage
      localStorage.setItem('videoUrl', videoUrl);
      localStorage.setItem('videoTitle', videoTitle);
      localStorage.setItem('videoDescription', videoDescription);

      // Set the state to show the modal with the video URL, title, and description
      setCurrentVideoUrl(videoUrl);
      setShowModal(true);
    } else {
      alert("No video available.");
    }
  };

  // Function to delete the course
  const deleteCourse = async (courseId) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // This should be 'teacher' if authorized to delete

    if (role !== 'teacher') {
      alert("You are not authorized to delete this course.");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5020/api/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Delete response:', response);
      alert("Course deleted successfully");
    } catch (error) {
      console.error('Delete error:', error);
      alert("Error deleting the course. Please try again.");
    }
  };

  return (
    <div >
      <Card style={{ width: "600px", marginLeft: "50px", display: "flex" }}>
        <Card.Img
          variant="top"
          src={`http://localhost:5020/${course.image.replace(/\\/g, '/')}`}
        />
        <Card.Body>
          <Card.Text>
            <strong style={{ color: "rgb(150, 64, 64)", fontSize: "18px" }}>{course.name}</strong>
            <br />
            <p style={{ fontSize: "12px" }}>{course.description}</p>
            <br />
            <p style={{ fontFamily: "Merienda", color: "rgb(36, 132, 159)" }}>
              Instructor: <span style={{ fontSize: "12px" }}>{teacherName}</span>
            </p>
            <p style={{ fontFamily: "Merienda", color: "rgb(36, 132, 159)" }}>
              Email: <span style={{ fontSize: "12px" }}>{teacherEmail}</span>
            </p>
            <br />
            <p style={{ fontFamily: "Merienda", color: "rgb(36, 132, 159)" }}>
              Duration: <span style={{ fontSize: "12px" }}>{course.duration}</span>
            </p>
            <p style={{ fontFamily: "Merienda", color: "rgb(36, 132, 159)" }}>
              Price: <span style={{ fontSize: "12px" }}>{course.fees}</span>
            </p>
            <p style={{ fontFamily: "Merienda", color: "rgb(36, 132, 159)" }}>
              Created By: <span style={{ fontSize: "12px" }}>{course.createdBy}</span>
            </p>
            <p style={{ fontFamily: "Merienda", color: "rgb(36, 132, 159)" }}>
              Start Date: <span style={{ fontSize: "12px" }}>{course.startDate}</span>
            </p>
            <p style={{ fontFamily: "Merienda", color: "rgb(36, 132, 159)" }}>
              End Date: <span style={{ fontSize: "12px" }}>{course.endDate}</span>
            </p>

            {videoUrl ? (
              <button
                onClick={handleWatchVideo}  // Trigger modal when clicked
                style={{
                  textDecoration: "none",
                  color: "rgb(229, 233, 235)",
                  cursor: "pointer",
                  fontSize: "13px",
                  backgroundColor: "rgb(75, 155, 158)",
                }}
              >
                Watch Video
              </button>
            ) : (
              <p>No video available</p>
            )}
          </Card.Text>
          {/* Show Edit button only if the role is 'teacher' */}
          {role === "teacher" && (
            <Button
              variant="warning"
              onClick={handleEditClick} // Opens the edit modal
              style={{ backgroundColor: "rgb(75, 155, 158)", marginRight: "10px" }}
            >
              Edit
            </Button>
          )}
          {/* Show Delete button only if the role is 'teacher' */}
          {role === "teacher" && (
            <Button
              variant="danger"
              onClick={() => deleteCourse(course._id)}
              style={{ backgroundColor: "rgb(75, 155, 158)" }}
            >
              <i className="fa-solid fa-trash" style={{ color: "white" }}></i>
            </Button>
          )}
        </Card.Body>
      </Card>

      {/* Modal to show video */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{localStorage.getItem('videoTitle')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{localStorage.getItem('videoDescription')}</p>
          {currentVideoUrl ? (
            <video width="100%" controls>
              <source src={currentVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p>Loading video...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Course Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Course Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="courseName">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editedCourse.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="courseDescription">
              <Form.Label>Course Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={editedCourse.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="courseFees">
              <Form.Label>Course Fees</Form.Label>
              <Form.Control
                type="number"
                name="fees"
                value={editedCourse.fees}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="courseDuration">
              <Form.Label>Course Duration</Form.Label>
              <Form.Control
                type="text"
                name="duration"
                value={editedCourse.duration}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="courseStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={editedCourse.startDate}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="courseEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={editedCourse.endDate}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Coursecard1;
