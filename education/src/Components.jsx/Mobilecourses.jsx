import React from "react";
import "../Styles/web.css";
import { Button, Card } from "react-bootstrap";

const webDevelopmentCourses= [
  {
    title: "The Mobile development Course",
    instructor: "Dr. Angela Yu, Developer and Lead Instructor",
    rating: 4.0,
    reviews: 417888,
    details: "61.5 total hours · 373 lectures · All Levels",
    price: "₹3,099",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvQ_A1YpPDcscDaiVTYKnCVn2foc3piDKWXg&s",
    badge: "Bestseller",
  },
  {
    title: "JavaScript - The Complete Guide 2024",
    instructor: "Maximilian Schwarzmüller",
    rating: 2.8,
    reviews: 350001,
    details: "52.5 total hours · 450 lectures · All Levels",
    price: "₹3,499",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS59m3YRaOrM0AN8pdjaAVxR1SEpPaHBVWa1w&s",
    badge: "Bestseller",
  },
  {
    title: "React - The Complete Guide (incl Hooks, Redux, and Next.js)",
    instructor: "Maximilian Schwarzmüller",
    rating: 6.7,
    reviews: 420100,
    details: "48 total hours · 310 lectures · Intermediate",
    price: "₹3,299",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg1MndL-Xp1JcnqaB0YOqTp6zDjrwYyGKsPA&s",
    badge: "Bestseller",
  },
];

function Mobilecourses() {
  return (
    <div className="course-grid">
      {webDevelopmentCourses.map((course, index) => (
        <Card key={index} style={{ width: "580px", margin: "1rem" }}>
          <Card.Img variant="top" src={course.image} />
          <Card.Body>
            <Card.Title>{course.title}</Card.Title>
            <Card.Text>
              <p className="instructor">{course.instructor}</p>
              <p className="rating">
                {course.rating} ★★★★☆ ({course.reviews})
              </p>
              <p className="details">{course.details}</p>
              {course.badge && <span className="badge">{course.badge}</span>}
              <p className="price">{course.price}</p>
            </Card.Text>
            <Button variant="primary">Enroll Now</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Mobilecourses;
