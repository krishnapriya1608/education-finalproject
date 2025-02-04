import React from 'react';

const List = () => {
  const teachers = [
    { name: "Mary Johnson", role: "Mentor", email: "mary.johnson@example.com", phone: "+1234567890" },
    { name: "James Brown", role: "Physics", email: "james.brown@example.com", phone: "+0987654321" },
  ];

  return (
    <div style={{ padding: "20px", backgroundColor: "#1A1C30", color: "white" }}>
      <h1>Teachers List</h1>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {teachers.map((teacher, index) => (
          <li
            key={index}
            style={{
              backgroundColor: "#2C2F48",
              margin: "10px 0",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <h3>{teacher.name} ({teacher.role})</h3>
            <p>Email: <a href={`mailto:${teacher.email}`} style={{ color: "#00f" }}>{teacher.email}</a></p>
            <p>Phone: <a href={`tel:${teacher.phone}`} style={{ color: "#00f" }}>{teacher.phone}</a></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
