import React, { useEffect, useState } from 'react';
import { FaHome, FaBook, FaCalendarAlt, FaCog, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedAvatar(localStorage.getItem("selectedAvatar") || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove authentication token
    localStorage.removeItem("selectedAvatar"); // Remove avatar selection
    navigate("/login"); // Redirect to login page
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', backgroundColor: '#2C2F48', color: '#fff' }}>
      
      {/* Avatar Display */}
      <div>
        {selectedAvatar && <img src={selectedAvatar} alt="Avatar" style={{ width: "60px", height: "50px", borderRadius: "50%" }} />}
      </div>

      {/* Navigation Links */}
      <ul style={{ listStyle: 'none', display: 'flex', margin: 0, padding: 0, marginRight: "140px" }}>
        <li style={{ marginLeft: '20px', fontSize: "15px" }}>
          <Link to="/teacher" style={{ color: '#fff', fontSize: "13px", textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <FaHome style={{ marginRight: '10px' }} />
            Dashboard
          </Link>
        </li>
        <li style={{ marginLeft: '20px' }}>
          <Link to="/achie" style={{ color: '#fff', textDecoration: 'none', fontSize: "13px", display: 'flex', alignItems: 'center' }}>
            <FaCalendarAlt style={{ marginRight: '10px' }} />
            Achievements
          </Link>
        </li>
        <li style={{ marginLeft: '20px' }}>
          <Link to="/quiz" style={{ color: '#fff', textDecoration: 'none', fontSize: "15px", display: 'flex', alignItems: 'center' }}>
            <FaUsers style={{ marginRight: '10px' }} />
            Quiz
          </Link>
        </li>
        <li style={{ marginLeft: '20px' }}>
          <Link to="/disc" style={{ color: '#fff', textDecoration: 'none', display: 'flex', fontSize: "13px", alignItems: 'center' }}>
            <FaCog style={{ marginRight: '10px' }} />
            Discussion
          </Link>
        </li>
        <li style={{ marginLeft: '20px' }}>
          <Link to="/mentor" style={{ color: '#fff', textDecoration: 'none', display: 'flex', fontSize: "13px", alignItems: 'center' }}>
            <FaCog style={{ marginRight: '10px' }} />
            Mentorship
          </Link>
        </li>
        <li style={{ marginLeft: '20px' }}>
          <Link to="/skill" style={{ color: '#fff', textDecoration: 'none', fontSize: "13px", display: 'flex', alignItems: 'center' }}>
            <FaCog style={{ marginRight: '10px' }} />
            Course 
          </Link>
        </li>
        <li style={{ marginLeft: '20px' }}>
          <Link to="/avatar" style={{ color: '#fff', fontSize: "13px", textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <FaCog style={{ marginRight: '10px' }} />
            Avatar 
          </Link>
        </li>
        <li style={{ marginLeft: '20px' }}>
          <Link to="/learn" style={{ color: '#fff', fontSize: "13px", textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <FaCog style={{ marginRight: '10px' }} />
             Challenges
          </Link>
        </li>
        
        {/* Logout Button */}
        <li style={{ marginLeft: '20px', cursor: "pointer" }}>
          <button onClick={handleLogout} style={{ background: "none", border: "none", color: "#fff", fontSize: "13px", display: "flex", alignItems: "center", cursor: "pointer" }}>
            <FaSignOutAlt style={{ marginRight: '10px' }} />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
