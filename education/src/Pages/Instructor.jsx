import React, { useState } from "react";
import "../Styles/instructor.css";
import { Button, Modal, Form, Table } from "react-bootstrap";
import { addProject } from "../Service/allAPI";
import QuizList from "../Components.jsx/QuizList";
import Challange from "../Components.jsx/Challange";
import Eventscreate from "../Components.jsx/Eventscreate";
import Discussion from "../Components.jsx/Discussion";
import Enrollment from "../Components.jsx/Enrollment";
import Calendarscreate from "../Components.jsx/Calendarscreate";

const CustomModal = ({ show, onHide, title, bodyContent, footerContent }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{bodyContent}</Modal.Body>
      <Modal.Footer>{footerContent}</Modal.Footer>
    </Modal>
  );
};

const Instructor = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [course, setCourse] = useState({
    name: "",
    description: "",
    image: null,
    fees: "",
    duration: "",
    category: "",
    video: null,
    startDate: "",
    teacher: user?._id || "",
    endDate: "",
    createdBy: user?.name || "",
    isCertified: false,
  });

  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const teachers = ["John Teacher", "Jane Instructor", "Mark Trainer"];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setCourse((prev) => ({ ...prev, [name]: files[0] }));
    } else if (type === "checkbox") {
      setCourse((prev) => ({ ...prev, [name]: checked }));
    } else {
      setCourse((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateCourseForm = () => {
    const { name, description, fees, duration, category, teacher, startDate, endDate, image, video } = course;
    if (!name || !description || !fees || !duration || !category || !teacher || !startDate || !endDate || !image || !video) {
      alert('All fields are required!');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateCourseForm()) return;

    const reqBody = new FormData();
    reqBody.append('name', course.name);
    reqBody.append('description', course.description);
    reqBody.append('fees', course.fees);
    reqBody.append('duration', course.duration);
    reqBody.append('category', course.category);
    reqBody.append('isCertified', course.isCertified);
    reqBody.append('teacher', course.teacher);
    reqBody.append('createdBy', course.createdBy);
    reqBody.append('startDate', course.startDate);
    reqBody.append('endDate', course.endDate);
    reqBody.append('image', course.image);
    reqBody.append('video', course.video);

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Token is missing! Please log in again.');
      return;
    }

    const reqHeader = {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`,
    };

    try {
      const response = await addProject(reqBody, reqHeader);
      if (response.status === 200) {
        alert('Course added successfully!');
        setShowCourseModal(false);
      } else {
        console.error('Unexpected API response:', response);
        alert('An unexpected error occurred.');
      }
    } catch (error) {
      console.error('Error adding course:', error.response ? error.response.data : error.message);
      alert('An error occurred while adding the course.');
    }
  };

  const handleAddEvent = () => {
    setUpcomingEvents((prevEvents) => [
      ...prevEvents,
      { id: prevEvents.length + 1, title: eventTitle, date: eventDate },
    ]);
    setEventTitle("");
    setEventDate("");
    setShowEventModal(false);
  };

  const handleAssignTeacher = (studentId) => {
    // Example function for teacher assignment
  };
  const handleLogout = () => {
    // Clear the local storage and redirect to login page
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');  // Navigate to the login page
  };

  return (
    <div className="main-panel">
      <header>
        <h1 style={{color:"whitesmoke"}}>Instructor Dashboard</h1>
      </header>
      <Button variant="danger" onClick={handleLogout} style={{ float: 'right', marginTop: '10px' }}>
          Logout
        </Button>
      <div className="coursee-management">
        <h2 style={{ position: "relative", left: "450px" }}>Course Management</h2>
        <div style={{ width: "200px", height: "200px" }} className="courses-grid">
          <div style={{ width: "400px", position: "relative", left: "100px" }} onClick={() => setShowCourseModal(true)} className="course-item">
            🌐 Web Development
          </div>
          <div style={{ width: "400px", position: "relative", left: "300px" }} onClick={() => setShowCourseModal(true)} className="course-item">
            📊 Data Science
          </div>
          <div style={{ width: "400px", position: "relative", left: "100px" }} onClick={() => setShowCourseModal(true)} className="course-item">
            📱 Mobile Sites
          </div>
          <div style={{ width: "400px", position: "relative", left: "300px" }} onClick={() => setShowTeacherModal(true)} className="course-item">
            👩‍🏫 Link Teachers to Students
          </div>
        </div>
      </div>

      <CustomModal
        show={showCourseModal}
        onHide={() => setShowCourseModal(false)}
        title="Add New Course"
        bodyContent={
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCourseName">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={course.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCourseDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={course.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCourseImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formCourseVideo">
              <Form.Label>Video</Form.Label>
              <Form.Control
                type="file"
                name="video"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formCourseFees">
              <Form.Label>Fees</Form.Label>
              <Form.Control
                type="number"
                name="fees"
                value={course.fees}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCourseDuration">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                name="duration"
                value={course.duration}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCourseCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={course.category}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCourseTeacher">
              <Form.Label>Teacher</Form.Label>
              <Form.Control
                type="text"
                name="teacher"
                value={course.teacher}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={course.startDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={course.endDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formIsCertified">
              <Form.Label>Certified</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Yes"
                  name="isCertified"
                  checked={course.isCertified === true}
                  onChange={() => setCourse((prev) => ({ ...prev, isCertified: true }))}
                />
                <Form.Check
                  type="radio"
                  label="No"
                  name="isCertified"
                  checked={course.isCertified === false}
                  onChange={() => setCourse((prev) => ({ ...prev, isCertified: false }))}
                />
              </div>
            </Form.Group>

            <Button variant="secondary" onClick={() => setShowCourseModal(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Course
            </Button>
          </Form>
        }
        footerContent={<></>}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <QuizList />
        <Challange />
        <Eventscreate />
        <Discussion />
        <Calendarscreate />
      </div>
    </div>
  );
};

export default Instructor;