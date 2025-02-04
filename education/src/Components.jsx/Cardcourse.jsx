import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { getCourses } from '../Service/allAPI';
import { useNavigate } from 'react-router-dom';
import CardHeader from '../Components.jsx/CardHeader';

function Cardcourse() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);  // State to check admin status
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userrole"); // Assuming you store user role in localStorage

    if (!token) {
      navigate("/login");
      return;
    }

    setIsAdmin(userRole === "admin"); // Set admin status

    const fetchCourses = async () => {
      try {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        };

        const result = await getCourses(reqHeader);
        if (result.status === 200) {
          setData(result.data);
        } else {
          console.error("Error fetching courses:", result);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchCourses();
  }, []);

  const checkoutHandler = async (category) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to enroll in a course.");
      navigate("/auth");
      return;
    }
  
    setLoading(true);
    try {
      // Send enrollment request
      const { data } = await axios.post(
        `http://localhost:5020/api/enrollments/enrollments`, // Correct API endpoint
        {
          category: category,
          userId: JSON.parse(localStorage.getItem("user"))._id, // Get user ID from localStorage
        },
        {
          headers: {
            "Authorization": `Bearer ${token}`, // Authorization header with token
          },
        }
      );
  
      alert(data.message);
      navigate(`/course/${category}`); // Navigate to the course page
    } catch (error) {
      console.error("Enrollment Error:", error);
      alert("Failed to enroll in the course");
    } finally {
      setLoading(false);
    }
  };
  

  const deleteCourseHandler = async (courseId) => {
    const token = localStorage.getItem("token");
    const userrole= localStorage.getItem("userrole");
    if(!userrole){
      alert("You are not authorized to delete this course.");
    }

    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await axios.delete(`http://localhost:5020/api/course/${courseId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });

      setData(prevData => prevData.filter(course => course._id !== courseId));

      alert("Course deleted successfully!");
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete the course");
    }
  };

  return (
    <>
      <CardHeader />
      {loading ? (
        <p>Loading.....</p>
      ) : (
        <div style={{ background: "linear-gradient(rgb(57, 122, 151),rgb(171, 172, 205))", marginTop: "15px" }}>
          <div>
            <h2 style={{ textAlign: "center", color: "rgb(9, 33, 85)", fontWeight: "bolder", marginTop: "15px" }}>
              Enroll To Our Courses
            </h2>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "120px", marginTop: "40px" }}>
            {data.map((course) => (
              <Card key={course._id} style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={`http://localhost:5020/${course.image.replace(/\\/g, "/")}`}
                  alt="Course Image"
                />
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>
                    {course.description}
                    <br />
                    <strong>Price:</strong> {course.price}
                    <br />
                    <strong>Category:</strong> {course.category}
                    <br />
                    <strong>Created By:</strong> {course.createdBy}
                  </Card.Text>
                  <Button variant="primary" onClick={() => checkoutHandler(course.category)}>
                    Enroll
                  </Button>
                  {isAdmin && (
                    <Button variant="danger" onClick={() => deleteCourseHandler(course._id)} style={{ marginLeft: "10px" }}>
                      Delete
                    </Button>
                  )}
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Cardcourse;
