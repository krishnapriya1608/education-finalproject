import React from "react";
import "../Styles/Courselist.css";
import { Button, Card } from "react-bootstrap";



function Mobiledevelopment({ courses }) {
  
  return (
    <div style={{display:"flex"}}  className="courses-grid ">
      {courses.map((course, index) => (
        <Card
          key={index}
          style={{
            width: "500px",
            height: "580px",
            margin: "20px",
            boxShadow: "2px 2px 2px 2px white",
           
          }}
        >
          <Card.Img
            style={{ width: "180px" }}
            variant="top"
            src={course.image}
          />
          <Card.Body>
            <Card.Title>{course.title}</Card.Title>
            <Card.Text>
              <p>{course.instructor}</p>
              <p>
                {course.rating} ★ ({course.reviews})
              </p>
              <p>{course.details}</p>
              {course.badge && <span>{course.badge}</span>}
              <p>{course.price}</p>
            </Card.Text>
            <Button style={{marginBottom:"20px",fontSize:"15px"}} variant="primary">Learn More</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Mobiledevelopment;


