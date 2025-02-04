import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { addQuiz } from '../Service/allAPI';

function QuizList() {
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // Initialize as string

  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    category: selectedCategory, // Use selectedCategory
    teacher: user?._id,
  });

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
  };

  const handleAddQuestion = () => {
    if (
      currentQuestion.question &&
      currentQuestion.options.every((opt) => opt) &&
      currentQuestion.correctAnswer >= 0 &&
      currentQuestion.correctAnswer < currentQuestion.options.length &&
      selectedCategory
    ) {
      setQuestions([...questions, { ...currentQuestion, category: selectedCategory }]);
      setCurrentQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        category: selectedCategory,
        teacher: user?._id,
      });
    } else {
      alert('Please fill in all fields for the question and select a category!');
    }
  };

  const submitQuiz = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to submit a quiz.');
      return;
    }

    console.log('Token being sent:', token);

    try {
      const reqBody = {
        category: selectedCategory, // Use selectedCategory
        questions,
        teacher: user?._id,
      };

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const response = await addQuiz(reqBody, reqHeader);

      if (response.status === 201) {
        alert('Quiz submitted successfully!');
        setQuestions([]);
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error.response?.data || error.message);
      alert('Failed to submit quiz. Please try again.');
    }
  };

  return (
    <div>
      <div style={{width:"200px",height:"100px",borderRadius:"10px 10px 10px 10px",backgroundColor:"rgb(157, 211, 215)"}}>
      <Button style={{borderRadius: "5px 10px 5px 10px",backgroundColor:"rgb(134, 176, 175)" ,marginLeft:"30px",marginTop:"30px" }} onClick={() => setShowModal(true)}>Create Quiz</Button>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Teacher:</strong> {user?.name || 'Unknown Teacher'}
          </p>

          <Form>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={selectedCategory} // Use selectedCategory
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {/* Replace with actual categories */}
                {['Web Development', 'Data Science', 'Mobile Development'].map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formQuestion">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the question"
                value={currentQuestion.question}
                onChange={(e) =>
                  setCurrentQuestion({ ...currentQuestion, question: e.target.value })
                }
              />
            </Form.Group>

            {currentQuestion.options.map((option, index) => (
              <Form.Group key={index} controlId={`formOption${index}`}>
                <Form.Label>Option {index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Enter option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </Form.Group>
            ))}

            <Form.Group controlId="formCorrectAnswer">
              <Form.Label>Correct Answer</Form.Label>
              <Form.Control
                as="select"
                value={currentQuestion.correctAnswer}
                onChange={(e) =>
                  setCurrentQuestion({ ...currentQuestion, correctAnswer: Number(e.target.value) })
                }
              >
                {currentQuestion.options.map((_, index) => (
                  <option key={index} value={index}>
                    Option {index + 1}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button variant="secondary" onClick={handleAddQuestion} className="mt-3">
              Add Question
            </Button>
          </Form>

          <hr />

          <h5>Questions List:</h5>
          <ul>
            {questions.map((q, idx) => (
              <li key={idx}>
                <strong>Q{idx + 1}: </strong> {q.question}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button onClick={submitQuiz} variant="primary">
            Submit Quiz
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default QuizList;
