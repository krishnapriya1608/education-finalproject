import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { addProject } from "../Service/allAPI"; // Assuming correct import

const Category = ({categories}) => {
  const [showCourseModal, setShowCourseModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [course, setCourse] = useState({
    name: "",
    description: "",
    image: null,
    fees: "",
    duration: "",
    category:"",
    video: null,
    startDate: "",
    teacher: user?._id || "",
    endDate: "",
    createdBy: user?.name || "",
    isCertified: false,
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!course.name || !course.description || !course.fees || !course.duration ||
        !course.category || !course.teacher || !course.createdBy ||
        !course.startDate || !course.endDate || !course.image || !course.video) {
      alert("All fields are required!");
      return;
    }

    const reqBody = new FormData();
    Object.entries(course).forEach(([key, value]) => {
      reqBody.append(key, value);
    });

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token is missing! Please log in again.");
      return;
    }

    const reqHeader = {
      "Authorization": `Bearer ${token}`,
    };

    try {
      const response = await addProject(reqBody, reqHeader);
      if (response.status === 200) {
        alert("Course added successfully!");
        setShowCourseModal(false);
      } else {
        alert("An unexpected error occurred.");
      }
    } catch (error) {
      alert("An error occurred while adding the course.");
      console.error("Error details:", error.response || error);
    }
  };

  return (
    <div>
      <div className="courses-grid">
        <div onClick={() => setShowCourseModal(true)} className="course-item">
          {categories}
        </div>
      </div>

      {/* Course Modal */}
      <Modal show={showCourseModal} onHide={() => setShowCourseModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

            {/* Image Upload */}
            <Form.Group controlId="formCourseImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleChange}  // Use handleChange to update state
              />
            </Form.Group>

            <Form.Group controlId="formCourseVideo">
              <Form.Label>Video</Form.Label>
              <Form.Control
                type="file"
                name="video"
                onChange={handleChange}  // Use handleChange to update state
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

            <Form.Group controlId="formCreatedBy">
              <Form.Label>Created By</Form.Label>
              <Form.Control
                type="text"
                name="createdBy"
                value={course.createdBy}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCertification">
              <Form.Check
                type="checkbox"
                label="Is Certified"
                name="isCertified"
                checked={course.isCertified}
                onChange={() =>
                  setCourse({ ...course, isCertified: !course.isCertified })
                }
              />
            </Form.Group>

            <Button variant="secondary" onClick={() => setShowCourseModal(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Course
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Category;
