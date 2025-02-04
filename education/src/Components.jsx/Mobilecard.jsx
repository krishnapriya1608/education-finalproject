import React from "react";
import "../Styles/Coursecard.css";
import { Button, Card } from "react-bootstrap";




function Mobilecard({title,image}) {
  return (
    <Card style={{ width: '18rem',marginLeft:"50px" }}>
    <Card.Img variant="top" src={image} />
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text>
       {title}
      </Card.Text>
    </Card.Body>
  </Card>
  );
}

export default Mobilecard;
