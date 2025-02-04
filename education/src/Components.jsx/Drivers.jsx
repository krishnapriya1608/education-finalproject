import React from "react";
import "../Styles/Drivers.css";
import { Card } from "react-bootstrap";


const Drivers = ({ image, title, description, rating, reviews, hours, lectures, level }) => {
  return (
   <>
      <Card style={{ width: '18rem' }}>
      <Card.Img  variant="top" src={image}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
        {description}
        <span>⭐ {rating}</span> ({reviews} reviews)
        </Card.Text>
      </Card.Body>
    </Card>

    </>
  );
};

export default Drivers;
