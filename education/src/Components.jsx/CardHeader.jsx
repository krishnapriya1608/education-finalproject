import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function CardHeader() {
  return (
    <div>
        <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Nav  className="me-auto">
<Link style={{textDecoration:"none"}} to={'/course'}>          <Nav.Link  href="#home" >Data Science</Nav.Link>
</Link>
<Link style={{textDecoration:"none"}} to={'/web'}>            <Nav.Link href="#home">Web development</Nav.Link>
</Link>
            <Nav.Link href="#features">Mobile computing</Nav.Link>
            <Nav.Link href="#pricing">Machine Learning</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default CardHeader
