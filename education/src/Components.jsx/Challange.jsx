import React, { useState } from 'react';
import { Button, Modal, TextField } from '@mui/material'; // Assuming you're using Material-UI for styling
import { createChallenge } from '../Service/allAPI'; // Importing the API function to create a challenge

function Challange() {
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility
  const user = JSON.parse(localStorage.getItem('user')); // Get user data from localStorage

  const [challange, setChallange] = useState({
    question: '',
    teacher: user.id,
    
  }); // State to handle challenge details

  // Handle the question input change
  const handleQuestionChange = (e) => {
    setChallange({ ...challange, question: e.target.value }); // Update the question in the state
  };

  // Handle submission
  const handleSubmit = async () => {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage for authentication
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    // Request body
    const reqBody = {
      question: challange.question, // Access question from challange state
      teacher: user.id,
      
    };

    try {
      const response = await createChallenge(reqBody, headers); // Call the API function
      if (response.status === 201) {
        setChallange(response.data); // Update the state with the response data
        console.log('Challenge created:', response.data);
        alert('Challenge created successfully!');
        setShowModal(false); // Close the modal after successful creation
      } else {
        alert('Failed to create challenge');
      }
    } catch (error) {
      console.error('Error creating challenge:', error);
      alert('Error creating challenge');
    }
  };

  return (
    <div>
      <div style={{width:"200px",height:"100px",backgroundColor:"rgb(165, 161, 144)",borderRadius:"5px 10px 5px 10px",marginLeft:"27px"}}>
      <Button  style={{ backgroundColor: 'rgb(151, 145, 119)', color: 'white', marginTop: '13px' ,width:"180px",height:"43px",marginLeft:"20px", fontFamily: "Cinzel serif",marginLeft:"150px",    borderRadius: "5px 10px 5px 10px",position:"relative",right:"140px",top:"20px"}} onClick={() => setShowModal(true)}>Create Challenge</Button>
      </div>
      {/* Modal to create challenge */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', width: '490px',height:"250px", margin: '100px auto' }}>
          <h2>Create a New Challenge</h2>
          <TextField
            label="Enter Question"
            variant="outlined"
            fullWidth
            value={challange.question} // Access question from challange state
            onChange={handleQuestionChange}
            style={{ marginBottom: '10px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
            <Button onClick={() => setShowModal(false)} color="secondary" variant="outlined" style={{ marginLeft: '10px' }}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Challange;
