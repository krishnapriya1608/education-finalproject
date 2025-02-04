import React, { useState } from 'react'
import { createCourse } from '../Service/allAPI';
import { Button, Modal,Form } from 'react-bootstrap';

function Enrollment() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const user=JSON.parse(localStorage.getItem("user"));
    const[enroll, setEnroll] = useState({
        title:"",
        description:"",
         category:"",
         createdBy:"",
         image:null,
         price:"",
         teacher:user?._id
    });
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "file") {
            setEnroll((prev) => ({ ...prev, [name]: files[0] }));
        }  else {
            setEnroll((prev) => ({ ...prev, [name]: value }));
        }
      };
      const handleSaveAndClose = (e) => {
        handleSubmit(e);
        handleClose();
    };
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting course:", enroll); // Check the data before sending
      
        const token = localStorage.getItem("token");
        const headers = {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        };
        const reqBody = new FormData();
        reqBody.append("title", enroll.title);
        reqBody.append("description", enroll.description);
        reqBody.append("category", enroll.category);
        reqBody.append("createdBy", enroll.createdBy);
        reqBody.append("image", enroll.image);
        reqBody.append("price", enroll.price);
        reqBody.append("teacher", enroll.teacher);
      
        try {
          const response = await createCourse(reqBody, headers);
          console.log("Response from API:", response); // Check the response
      
          if (response.status === 200) {
            alert("Course created successfully");
            setShow(false);
            setEnroll({
              title: "",
              description: "",
              category: "",
              createdBy: "",
              image: null,
              price: "",
              teacher:user?._id
            })
          }
          
        } catch (error) {
          console.error("Error creating course:", error); // Ensure error is logged
          alert("Error creating course");
        }
      };
      
  return (
    <div>
      

      <Button  onClick={handleShow}>
        Add different course
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
            <Form >
            <Form.Group controlId="formCourseName">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={enroll.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCourseDescription">
              <Form.Label>Course Descrption</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={enroll.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCourseCategory">
              <Form.Label>Course Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={enroll.category}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCourseCreatedBy">
              <Form.Label>Course CreatedBy</Form.Label>
              <Form.Control
                type="text"
                name="createdBy"
                value={enroll.createdBy}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCourseimage">
              <Form.Label>Course Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
               
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCoursPrice">
              <Form.Label>Course Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={enroll.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCoursteacher">
              <Form.Label>Course teacher</Form.Label>
              <Form.Control
                type="text"
                name="teacher"
                value={enroll.teacher}
                onChange={handleChange}
                required
              />
            </Form.Group>
            </Form>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveAndClose}>
    Save Changes
</Button>

        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Enrollment;
