import React, { useState, useEffect } from "react";
import axios from "axios";
import Enrollment from "../Components.jsx/Enrollment";
import { useNavigate } from "react-router-dom";
import '../Styles/AdminDashboard.css'
const AdminDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");

  const handleApprove = async (userId) => {
    console.log("Approving user with ID:", userId); // Debugging
  
    if (!userId) {
      alert("User ID is missing!");
      return;
    }
  
    try {
      const token = getToken();
      const response = await axios.put(
        `http://localhost:5020/api/admin/approve-teacher/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Assuming the response contains the updated teacher
      const approvedTeacher = response.data.teacher;
  
      // Update the state to reflect the approved teacher
      setTeachers(prevTeachers =>
        prevTeachers.map(teacher =>
          teacher._id === userId ? { ...teacher, isApproved: true } : teacher
        )
      );
  
      alert('Teacher approved successfully!');
    } catch (error) {
      console.error('Error approving teacher:', error);
      alert('Error approving teacher. Please try again.');
    }
  };
  


  const fetchTeachers = async () => {
    try {
        const token = getToken(); // Retrieve the token from localStorage
        const response = await axios.get('http://localhost:5020/api/admin/teachers', {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the headers
            },
        });

        setTeachers(response.data); // Set the teachers data in the state

        // Store the result in localStorage for persistence
        localStorage.setItem('teachers', JSON.stringify(response.data));
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching teachers:', error);
    }
};





  const handleReject = async (teacherId) => {
    try {
      const token = getToken();
      await axios.put(`http://localhost:5020/api/admin/reject-teacher/${teacherId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Teacher rejected successfully!");
      fetchTeachers();
    } catch (error) {
      alert("Error rejecting teacher.");
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <ul className="teacher-list">
        {teachers.map((teacher) => (
          <li key={teacher._id} className="teacher-card">
            {teacher.name} - {teacher.isApproved ? "Approved" : "Pending"}
            <div>
              <button className="approve-btn" onClick={() => handleApprove(teacher._id, teacher.email)}>Approve</button>
              <button className="reject-btn" onClick={() => handleReject(teacher._id)}>Reject</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="enrollment-container">
        <Enrollment />
      </div>
    </div>
  );
};

export default AdminDashboard;
