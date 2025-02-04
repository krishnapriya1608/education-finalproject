import React from 'react';
import '../Styles/mentor.css';
import { Link } from 'react-router-dom';


const messages = [
  { text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod", sender: true },
  { text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh", sender: false },
  { text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod", sender: true },
  { text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod", sender: false },
  { text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh", sender: false },
  { text: "Lorem ipsum dolor sit amet, consectetuer", sender: true },
  { text: "Lorem ipsum dolor sit amet, consectetuer", sender: true },
  { text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam adipiscing elit, sed", sender: false },
];

function Mentor() {
  return (
    <div style={{    background: "linear-gradient(rgb(145, 177, 184), rgb(91, 131, 154))"
    }} >

    <div   className="chat-container">
      <div className="chat-header">
        <Link style={{textDecoration:"none"}} to={'/dash'}>        <h1 style={{fontSize:"28px",marginLeft:"24px",color:"rgb(150, 60, 173)"}}>Chat with teacher</h1>
        </Link>
      </div>
      <div className="message-list">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender ? 'sent' : 'received'}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Type a message..." />
        <button>+</button>
        <button>A</button>
      </div>
    </div>
    </div>
  );
}

export default Mentor;