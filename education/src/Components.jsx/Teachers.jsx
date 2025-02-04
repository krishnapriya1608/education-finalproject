import React from 'react';
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Teachers = () => {
  const teachers = [
    {
      name: "Mary Johnson",
      role: "Mentor",
      email: "mary.johnson@example.com",
      phone: "+1234567890",
      image: "https://png.pngtree.com/png-clipart/20240723/original/pngtree-beautiful-female-teacher-cartoon-illustration-holding-a-book-girl-student-clipart-png-image_15620665.png",
    },
    {
      name: "James Brown",
      role: "Physics",
      email: "james.brown@example.com",
      phone: "+0987654321",
      image: "https://png.pngtree.com/png-clipart/20240723/original/pngtree-beautiful-female-teacher-cartoon-illustration-holding-a-book-girl-student-clipart-png-image_15620665.png",
    },
  ];

  return (
    <div
      style={{
        flex: 1,
        position: "relative",
        bottom: "1120px",
        padding: "20px",
        borderRadius: "8px",
        left: "820px",
        fontSize: "14px",
      }}
    >
      <div style={{ display: "flex" }}>
        <h2 style={{ fontSize: "20px", marginTop: "20px" }}>Linked Teachers</h2>
        <a
          style={{ marginLeft: "90px", marginTop: "20px", color: "white" }}
          href="#"
        >
          See all
        </a>
      </div>
      <ul
        type="none"
        style={{ padding: "10px", lineHeight: "1.8", listStyle: "none" }}
      >
        {teachers.map((teacher, index) => (
          <div
            key={index}
            style={{ backgroundColor: "#2C2F48", borderRadius: "20px", marginBottom: "10px", padding: "10px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "5px",
              }}
            >
              <img
                style={{
                  borderRadius: "50px",
                  width: "40px",
                  height: "40px",
                  backgroundColor: "white",
                }}
                src={teacher.image}
                alt={`${teacher.name}`}
              />
              <li>
                <Link style={{textDecoration:"none",color:"white"}} to={'/list'}>{teacher.name} ({teacher.role})
                </Link>
              </li>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "15px",
                padding: "5px 10px",
              }}
            >
              <a
                href={`mailto:${teacher.email}`}
                style={{ color: "white", textDecoration: "none" }}
                title={`Email ${teacher.name}`}
              >
                <IoMdMail />
              </a>
              <a
                href={`tel:${teacher.phone}`}
                style={{ color: "white", textDecoration: "none" }}
                title={`Call ${teacher.name}`}
              >
                <FaPhoneAlt />
              </a>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Teachers;
