import React, { useState } from "react";
import "../Styles/Header.css";
import { Link } from "react-router-dom";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`); 
  };

  return (
    <header className="header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", backgroundColor: "white", color: "white" }}>
      {/* Logo Section */}
<Link style={{textDecoration:"none"}} to={'/course'}>      <div className="logo" style={{ fontSize: "24px", fontWeight: "bold" }}>Bright</div>
</Link>
      {/* Navigation Section */}
      <nav>
        <ul style={{ display: "flex", gap: "20px", listStyleType: "none", margin: 0, padding: 0 }}>
          <Link style={{ textDecoration: "none", color: "white" }} to="/course">
            <li style={{color: "black",fontSize:"13px"}}>Data Science</li>
          </Link>
          <Link style={{ textDecoration: "none", color: "white" }} to="/web">
            <li style={{color: "black",fontSize:"13px"}}>Web Development</li>
          </Link>
          <Link style={{ textDecoration: "none", color: "white" }} to="/mobile">
            <li style={{color: "black",fontSize:"13px"}}>Mobile Development</li>
          </Link>
          <li style={{ cursor: "pointer" ,color:"black",fontSize:"13px"}}>Programming Languages</li>
        </ul>
      </nav>

      {/* Search Field Section */}
      <form onSubmit={handleSearchSubmit} style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
            width: "200px",
            outline: "none",
          }}
        />
        <button type="submit" style={{ padding: "8px 12px", borderRadius: "5px", backgroundColor: "#4CAF50", color: "white", border: "none" }}>
          Search
        </button>
      </form>

      {/* Actions Section */}
      <div className="actions" style={{ display: "flex", gap: "10px" }}>
        <Link to="/auth">
          <button style={{ borderRadius: "10px", borderColor: "white", backgroundColor: "transparent", color: "black",marginBottom:"10px" }}>Log in</button>
        </Link>
        <Link to="/auth">
          <button style={{ borderRadius: "10px", borderColor: "white", backgroundColor: "green", color: "white",marginBottom:"10px" }}>Sign up</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
