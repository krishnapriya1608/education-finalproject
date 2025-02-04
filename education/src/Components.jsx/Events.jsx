// Events.jsx
import React, { useState, useEffect } from 'react';
import { SlOptionsVertical } from "react-icons/sl";
import { getEvent } from '../Service/allAPI';

const Events = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from the API
  const getEvents = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token is missing! Please log in again.");
      return;
    }

    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };

    try {
      const response = await getEvent(reqHeader);
      console.log("API Response Data:", response.data);

      if (response.status === 200) {
        setEvents(response.data); // Directly set the array of events
      } else {
        console.error("Response Error:", response);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getEvents();
    } else {
      alert("Token is missing! Please log in again.");
    }
  }, []);

  // Log events for debugging
  useEffect(() => {
    console.log("Fetched Events:", events);
  }, [events]);

  return (
    <div style={{ flex: 1, position: "absolute", top: "890px", padding: '10px', borderRadius: '8px', marginRight: "14px",marginTop:"50px" }}>
    <div style={{ display: "flex" }}>
      <h2 style={{ fontSize: "20px", position: "relative", top: "10%" }}>Upcoming Events</h2>
      <a style={{ marginLeft: "90px", marginTop: "5px", color: "white", fontSize: "13px" }} href="#">See all</a>
    </div>
    <ul style={{ padding: '10px', lineHeight: '1.8', listStyleType: 'none', backgroundColor: '#2C2F48', borderRadius: '20px' }}>
      {events.length > 0 ? (
        <li style={{ padding: '10px' }}> {/* Single parent container for all events */}
          {events.map((event, index) => (
            <div key={index} style={{ display: "flex", marginBottom: "10px", padding: "5px", borderBottom: "1px solid gray" }}>
              <img
                style={{ borderRadius: "50px", width: "50px", height: "40px", backgroundColor: "white" }}
                src="https://danielpuiatti.com/the-ultimate-guide-to-building-a-calendar-of-events-in-html-css-and-javascript/social-image.jpg/"
                
              />
              <div style={{ marginLeft: "10px", padding: "3px" }}>
                <p style={{color:"rgb(74, 160, 161)",fontSize:"bold"}}>{event.name}</p>
                <p >{event.description}</p>
                <p style={{ fontSize: "10px", color: "rgb(157, 64, 64)" }}>{new Date(event.date).toLocaleString()}</p>
              </div>
             
            </div>
          ))}
        </li>
      ) : (
        <li>No events available.</li>
      )}
    </ul>
  </div>
  
  );
};

export default Events;
