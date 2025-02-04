import React, { useEffect, useState } from "react";
import '../Styles/Calendar.css';
import { getCalendar } from "../Service/allAPI";


const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState("Today");
  const[data,setData]=useState([]);

  const days = ["Yesterday", "Today", "Tomorrow"];

  // const events = [
  //   {
  //     time: "9:40",
  //     title: "Electronics lesson",
  //     description: "21 lesson",
  //     endTime: "10:30",
  //   },
  //   {
  //     time: "11:00",
  //     title: "Electronics lesson",
  //     description: "23 lesson",
  //     endTime: "11:45",
  //   },
  //   {
  //     time: "12:00",
  //     title: "Robotics lesson",
  //     description: "23 lesson",
  //     endTime: "12:45",
  //   },
  //   {
  //     time: "13:45",
  //     title: "C++ lesson",
  //     description: "21 lesson",
  //     endTime: "14:30",
  //   },
  // ];

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };
  const getcalendar=async()=>{
    const token = localStorage.getItem('token');
    if(!token){
      alert('Token is missing');
      return;
    }

    const reqHeader={ 
      Authorization: `Bearer ${token}`, 
    }
    try{
      const response=await getCalendar(reqHeader);
      if(response.status===200){
        setData(response.data);
        console.log(response.data);
        
      }else{
        console.error("Response Error:", response);
      }
    }catch(error){
      console.error("Error:", error);
    }
  }
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(!token){
      alert('Token is missing');
      return;
    }else{
      getcalendar();
    }
   
  },[])
    
    
  return (
    <div style={{marginLeft:"130px",}} className="calendar">
      <div className="calendar-header">
        <h2>Calendar</h2>
        <p>{data.length} events {selectedDay.toLowerCase()}</p>
        <select
          className="today-dropdown"
          value={selectedDay}
          onChange={handleDayChange}
        >
          {days.map((day, index) => (
            <option key={index} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>

      {/* Timeline section with clock */}
      <div className="timeline">
  {data.map((event, index) => (
    <div className="event-container" key={index}>
      <div className="timeline-time">
        {new Date(event.date).toLocaleDateString()} {/* Formatting date */}
      </div>

      <div className="timeline-marker"></div>
      <div className={`event-card ${index === 0 ? "highlighted" : ""}`}>
        <div style={{textAlign:"center"}} className="event-details">
          <h3 style={{color:"rgb(33, 146, 144)"}}>{event.title}</h3> 
          <p>{event.description}</p>
          <p>{event.createdBy}</p>

          <span style={{color:"rgb(149, 22, 22)"}} className="event-end-time">
            {event.time1} to {event.time2} {/* Adjusted for time2 */}
          </span>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default Calendar;
