import React, { useState } from 'react';
import { addCalendar } from '../Service/allAPI';
import { Button, Col, Form, Modal } from 'react-bootstrap';

function Calendarscreate() {
  const [data, setData] = useState({
    title: '',
    description: '',
    date: '',
    createdBy: '',
    time1:"",
    time2:""
    
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, date ,createdBy,time1,time2} = data;
    if (!title || !description || !date||!createdBy||!time1||!time2) {
      alert('All fields are required');
      return;
    } else {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Token is missing');
        return;
      }

      const reqHeader = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await addCalendar(data, reqHeader);
        if (response.status === 201) {
          alert('Calendar created successfully');
          console.log(response.data);
          setData({
            title: '',
            description: '',
            date: '',
            createdBy: '',
            time1:"",
            time2:""
            
          });
          setShow(false);
        } else {
          alert('Error in creating calendar');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div style={{width:"200px",height:"100px",backgroundColor:"rgb(185, 179, 131)",borderRadius:"5px 10px 5px 10px",position:"relative",top:"50%",left:"10%",transform:"translate(-50%, -50%)"}}>
      <Button style={{marginTop:"30px",marginLeft:"20px",backgroundColor:"rgb(158, 152, 93)",borderRadius:"5px 10px 5px 10px"}} variant="primary" onClick={handleShow}>
        Add Calendar
      </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Calendar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={data.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={data.date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCreatedBy">
              <Form.Label>Created By</Form.Label>
              <Form.Control
                type="text"
                name="createdBy"
                value={data.createdBy}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTime1">
              <Form.Label>Time1</Form.Label>
              <Form.Control
                type="text"
                name="time1"
                value={data.time1}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTime2">
              <Form.Label>Time2</Form.Label>
              <Form.Control
                type="text"
                name="time2"
                value={data.time2}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
   </div>
  );
}

export default Calendarscreate;
