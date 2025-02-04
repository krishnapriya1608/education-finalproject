import React, { useState } from 'react';
import '../Styles/Grid1.css'; 
import { Card, Modal, Button } from 'react-bootstrap';
import Header from '../Components.jsx/Header';

const CourseGrid = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      title: 'Ultimate AWS Certified Solutions Architect Associate 2025 - 4 Certifications!',
      author: 'Stephane Maarek | AWS Certified Cloud....',
      rating: 4.7,
      ratingCount: 244491,
      price: '₹399',
      originalPrice: '¥3,499',
      badge: 'Premium',
      image:"https://i.ytimg.com/vi/ZB5ONbD_SMY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBtUGySSP6q1An_rmKY2R0xw-LArw"
    },
    {
      title: 'Amazon Web Services (AWS) Certified Associate (SAA-C03) Course',
      author: 'BackSpace Academy, Paul Coady',
      rating: 4.4,
      ratingCount: 24023,
      price: '₹549',
      originalPrice: '¥4,999',
      badge: 'Bestseller',
      image:"https://img-c.udemycdn.com/course/750x422/4904644_fd7f_6.jpg"
    },
    {
      title: 'NEW AWS Certified Solutions Architect Associate',
      author: 'Syed Raza, Qasim Shah, Ali Bokhari, ClayDesk E-....',
      rating: 4.5,
      ratingCount: 2728,
      price: '₹399',
      originalPrice: '₹3,099',
      badge: 'Premium',
      image:"https://img-c.udemycdn.com/course/750x422/3142170_19fd_4.jpg"
    },
        {
      title: 'AWS Certified Solutions Architect',
      author: 'Neal Davis | AWS Certified Solutions Architect &...',
      rating: 4.6,
      ratingCount: 20280,
      price: '₹449',
      originalPrice: '₹3,999',
      badge: 'Premium',
      image:"https://img-c.udemycdn.com/course/750x422/3142166_a637_3.jpg"
    },
  ];


  const coursees = [
    {
      title: 'Part 1: AWS Certified Solutions Architect SAA C03 ',
      author: 'Stephane Maarek | AWS Certified Cloud....',
      rating: 4.7,
      ratingCount: 244491,
      price: '₹399',
      originalPrice: '¥3,499',
      badge: 'Premium',
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq2GZdybCbGiS6pE6brk_WRflf5zi-UdkNiQ&s"
    },
    {
      title: 'AWS Certified Solutions Architect  ',
      author: 'BackSpace Academy, Paul Coady',
      rating: 4.4,
      ratingCount: 24023,
      price: '₹549',
      originalPrice: '¥4,999',
      badge: 'Bestseller',
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Tqfh1YJA1Ent52CM9yCdpDQUFiPchKNt_lMoBAPKyqB1p1osRJzw7aKdsb80Hd4FtUc&usqp=CAU"
    },
    {
      title: 'NEW AWS Certified Solutions Architect Associate',
      author: 'Syed Raza, Qasim Shah, Ali Bokhari, ClayDesk E-....',
      rating: 4.5,
      ratingCount: 2728,
      price: '₹399',
      originalPrice: '₹3,099',
      badge: 'Premium',
      image:"https://i.ytimg.com/vi/YqWuL3an-5o/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBze-ZlxbknVbx6bUBKieGcF6pnDQ"
    },
        {
      title: 'AWS Certified Solutions Architect',
      author: 'Neal Davis | AWS Certified Solutions Architect &...',
      rating: 4.6,
      ratingCount: 20280,
      price: '₹449',
      originalPrice: '₹3,999',
      badge: 'Premium',
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-w-xeNXdD7BTEKdu-rMEo1sfWDASQo7xAeFjagnELQvDI2W2zas6xbHt70mky1n5aqL8&usqp=CAU"
    },
  ];
  
  const handleEnroll = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };

  return (
    <>
    <div style={{    background: "linear-gradient(rgb(145, 177, 184), rgb(91, 131, 154))"
    }}>
      <Header/>
      <div
        style={{
          width: '1000px',
          height: '300px',
          boxShadow: '2px 4px 4px 2px white',
          borderRadius: '31px',
          marginLeft: '150px',
          marginTop: '50px'
        }}
      >
        <h2 style={{ color: 'rgb(92, 64, 158)' }}>
          Top AWS Certified Solutions Architect - Associate courses in IT Certifications
        </h2>
        <h6>Related topics Cloud Certification</h6>
        <p>
          Earners of this certification have a comprehensive understanding of AWS services and technologies. They
          demonstrated the ability to build secure and robust solutions using architectural design principles based on
          customer requirements.
        </p>
      </div>

      {/* Most Popular Courses */}
      <div style={{ marginTop: '50px' }} className="course-container">
        <h3>Most popular</h3>
        <div style={{ gap: '50px',   background: "linear-gradient(rgb(145, 177, 184), rgb(91, 131, 154))"
    }}  className="course">
          {courses.map((course, index) => (
            <Card key={index} style={{ width: '18rem', gap: '20px' }}>
              <Card.Img variant="top" src={course.image} />
              <Card.Body>
                <Card.Title style={{ fontSize: '15px' }}>{course.title}</Card.Title>
                <Card.Text>
                  {course.author}
                  <br />
                  {course.rating} ★★★★☆
                  <br />
                  {course.ratingCount}
                  <br />
                  {course.price}
                  <br />
                  {course.badge}
                </Card.Text>
                <Button variant="primary" onClick={() => handleEnroll(course)}>
                  Enroll Now
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      {/* AWS Certified Courses */}
      <div style={{ marginTop: '50px' }} className="course-container">
        <h2>AWS Certified Solutions Architect – Associate Courses</h2>
        <div style={{ gap: '50px' ,   background: "linear-gradient(rgb(145, 177, 184), rgb(91, 131, 154))"
    }}className="course">
          {coursees.map((course, index) => (
            <Card key={index} style={{ width: '18rem', gap: '20px' }}>
              <Card.Img variant="top" src={course.image} />
              <Card.Body>
                <Card.Title style={{ fontSize: '15px' }}>{course.title}</Card.Title>
                <Card.Text>
                  {course.author}
                  <br />
                  {course.rating} ★★★★☆
                  <br />
                  {course.ratingCount}
                  <br />
                  {course.price}
                  <br />
                  {course.badge}
                </Card.Text>
                <Button variant="primary" onClick={() => handleEnroll(course)}>
                  Enroll Now
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal for Payment Details */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enroll in {selectedCourse?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Course:</strong> {selectedCourse?.title}
          </p>
          <p>
            <strong>Author:</strong> {selectedCourse?.author}
          </p>
          <p>
            <strong>Price:</strong> {selectedCourse?.price}
          </p>
          <p>
            <strong>Original Price:</strong> {selectedCourse?.originalPrice}
          </p>
          <p>
            <strong>Badge:</strong> {selectedCourse?.badge}
          </p>
          <p style={{ color: 'green' }}>Payment details will be processed securely.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={() => alert('Payment successful!')}>
            Pay Now
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  );
};

export default CourseGrid;






 