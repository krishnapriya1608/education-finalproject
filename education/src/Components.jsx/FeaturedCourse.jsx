import React, { useState } from "react";
import { Button, Card, Modal, Form } from "react-bootstrap";
import "../Styles/Feature.css";
import { Link } from "react-router-dom";

function FeaturedCourse() {

  const features = [
    {
      title: "Hands-on training",
      description: "Upskill effectively with AI-powered coding exercises, practice tests, and quizzes.",
      icon: "🛠️", 
    },
    {
      title: "Certification prep",
      description: "Prep for industry-recognized certifications by solving real-world challenges and earn badges along the way.",
      linkText: "Explore courses →",
      icon: "📜", 
    },
    {
      title: "Insights and analytics",
      description:
        "Fast-track goals with advanced insights plus a dedicated customer success team to help drive effective learning.",
      badge: "Enterprise Plan",
      icon: "📊", 
    },
    {
      title: "Customizable content",
      description:
        "Create tailored learning paths for team and organization goals and even host your own content and resources.",
      badge: "Enterprise Plan",
      icon: "⚙️",
    },
  ];
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePayment = () => {
    if (!formData.name || !formData.email || !formData.cardNumber) {
      alert("Please fill in all fields.");
      return;
    }
    alert(`Payment successful for ${formData.name}!`);
    setShowModal(false);
    setFormData({ name: "", email: "", cardNumber: "" });
  };
  

  // Google Pay integration example
  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["MASTERCARD", "VISA"],
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "example",
            gatewayMerchantId: "exampleGatewayMerchantId",
          },
        },
      },
    ],
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPrice: "1499.00",
      currencyCode: "INR",
    },
    merchantInfo: {
      merchantName: "Your Business Name",
      merchantId: "12345678901234567890",
    },
  };

  const onLoadPaymentData = (paymentData) => {
    console.log("Payment data loaded:", paymentData);
  };

  return (
    <>
    <div style={{display:"flex"}}>

   
      <div>
      <Card
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "950px",
          margin: "100px",
          marginLeft: "250px",
        }}
      >
        <Card.Img
          variant="top"
          src="https://media.istockphoto.com/id/1452604857/photo/businessman-touching-the-brain-working-of-artificial-intelligence-automation-predictive.jpg?s=612x612&w=0&k=20&c=GkAOxzduJbUKpS2-LX_l6jSKtyhdKlnPMo2ito4xpR4="
        />
        <Card.Body>
          <Card.Title>Featured Course</Card.Title>
          <Card.Text>
            Many learners enjoyed this highly rated course for its engaging
            content. Artificial Intelligence Mastery: Complete AI Bootcamp 2025
            <p>By Vivian Aranha</p>
            <p>
              <strong>Updated December 2024</strong> · 51.5 total hours · 261
              lectures · Beginner
            </p>
            <p>
              <span className="rating">4.8</span> ★★★★☆ (18)
              <span className="badge">Hot & New</span>
            </p>
            <p className="price">₹1,499</p>
          </Card.Text>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Enroll Now
          </Button>
        </Card.Body>
      </Card>

      </div>


      <div style={{width:"500px"}}  className="features-section">
      {features.map((feature, index) => (
        <div key={index} className={`feature-card ${feature.badge ? "enterprise" : ""}`}>
          <div className="feature-icon">{feature.icon}</div>
          <h3 className="feature-title">{feature.title}</h3>
          <p className="feature-description">{feature.description}</p>
          {feature.badge && <span className="feature-badge">{feature.badge}</span>}
          {feature.linkText && (
           <Link to={'/certificate'}> <a href="#" className="feature-link">
           {feature.linkText}
         </a></Link>
          )}
        </div>
      ))}
    </div>


    </div>
    <div  className="container">
      <div style={{gap:"20px"}} className="pricing-section">
        <div style={{width:"500px"}} className="pricing-card">
          
          <h3>Personal Plan</h3>
          <p>For you</p>
          <br />
          <div className="user-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-8c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z" />
            </svg>
          </div>
          
          <p>Starting at ₹850 per month</p>
          <p>Billed monthly or annually. Cancel anytime.</p>
          <br />
          <button onClick={() => setShowModal(true)} style={{backgroundColor:"green"}}>Start Subscription →</button>
          <br />
          <ul>
            <li>Access to 12,000+ top courses</li>
            <li>Certification prep</li>
        
          </ul>
        </div>

        <div style={{width:"500px"}} className="pricing-card">
          <h3>Team Plan</h3>
          <p>For your team</p>
          <div className="user-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-8c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-8c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z" />
            </svg>
          </div>
          <br />
          <p>₹2,000 a month per user</p>
          <p>Billed annually. Cancel anytime.</p>
          <br />
          <button onClick={() => setShowModal(true)} style={{backgroundColor:"green"}}>Start Subscription →</button>
          <br />
          <br />
          <ul>
            <li>Access to 12,000+ top courses</li>
            <li>Certification prep</li>
            <li>Goal-focused recommendations</li>
          
          </ul>
        </div>

        <div style={{width:"500px"}} className="pricing-card">
          <h3>Enterprise Plan</h3>
          <p>For your whole organization</p>
          <div className="user-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-8c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-8c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-8c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z" />
            </svg>
          </div>
          <br />
          <p>Contact sales for pricing</p>
          <br />
          <button onClick={() => setShowModal(true)} style={{backgroundColor:"green"}}>Request a demo →</button>
          <br /><br />
          <ul>
            <li>Access to 27,000+ top courses</li>
            <li>Certification prep</li>
            <li>Goal-focused recommendations</li>
            <li>AI-powered coding exercises</li>
            <li>Advanced analytics and insights</li>
           
          </ul>
        </div>
      </div>
    </div>

      {/* Payment Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your card number"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePayment}>
            Pay ₹1,499
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FeaturedCourse;
