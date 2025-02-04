import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../Service/allAPI"; // Import API functions
import "../Styles/Auth.css";
import axios from "axios";


const Auth = () => {
  const [role, setRole] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const[alertShown, setAlertShown] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    rollNumber: "",
    class: "",
    teacherId: "",
    subject: "",
  });
 
  const [isLogin, setIsLogin] = useState(true); // Default to login form
  const navigate = useNavigate();
  const firstRender = useRef(true); // Track first render

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setRole(role);  // Set role globally if needed
    setUserData({ ...userData, role });

    // Save selected role in localStorage
    localStorage.setItem("role", role);
    console.log("Selected role:", role);  // Log the selected role
  };

  const handleBack = () => {
    setSelectedRole("");
  };


  
  // The registration handler for users
  const handleRegister = async (e) => {
    e.preventDefault();
  
    const { name, email, password, role, rollNumber, class: className, teacherId, subject } = userData;
  
    console.log("Role during registration:", role);
  
    if (!name || !email || !password || !role || 
        (role === "student" && (!rollNumber || !className)) || 
        (role === "teacher" && (!teacherId || !subject))) {
      alert("Please fill in all fields.");
      return;
    }
  
    try {
      const response = await registerUser(userData);  // Call your registration API
  
      console.log("Response from registerUser:", response);
  
      alert(response?.data?.message || "Registration successful!");
      console.log("Activation Token:", response?.data?.activationToken);
  
      // Store the activation token in localStorage
      localStorage.setItem("activationToken", response?.data?.activationToken);
  
      // Store the user's email in localStorage
      localStorage.setItem("userEmail", JSON.stringify(email));  // Storing email as a string
  
      // If the user is a teacher, update the approvedTeachers array
      const approvedTeachers = JSON.parse(localStorage.getItem("approvedTeachers")) || [];
  
      if (response?.data?.role === "teacher") {
        // Find if the teacher already exists in the approvedTeachers array
        const existingTeacherIndex = approvedTeachers.findIndex(
          teacher => teacher.email.trim().toLowerCase() === email.trim().toLowerCase()
        );
  
        if (existingTeacherIndex === -1) {
          // If the teacher does not exist, add the new teacher
          approvedTeachers.push({
            name,
            email,
            role: "teacher",
            isApproved: response?.data?.isApproved,  // Check if teacher is approved
          });
        } else {
          // Update the approval status of the existing teacher in the list
          approvedTeachers[existingTeacherIndex].isApproved = response?.data?.isApproved;
        }
  
        // Save the updated approvedTeachers array back to localStorage
        localStorage.setItem("approvedTeachers", JSON.stringify(approvedTeachers));
      }
  
      // If the role is teacher and not approved, wait for approval
      if (role === "teacher" && !response?.data?.isApproved) {
        alert("Your registration is pending admin approval.");
        navigate("/auth");  // Stay on auth page until approved
        return;
      }
  
      // If the teacher is approved or the user is a student, proceed to OTP page
      navigate("/otp", { state: { token: response?.data?.activationToken } });
  
      // Reset form after successful registration
      setUserData({ name: "", email: "", password: "", role: "", rollNumber: "", class: "" });
  
    } catch (error) {
      console.error("Error during registration:", error);
      alert(error?.response?.data?.message || "Registration failed. Please try again later.");
    }
  };
  
  
  
  
  // Effect hook to handle user email and approved teachers
 useEffect(() => {
    if (!firstRender.current) return; // Prevent re-execution
    firstRender.current = false; // Set to false after first execution

    const activationToken = localStorage.getItem("activationToken");
    const storedTeachers = localStorage.getItem("teachers");
    const userEmail = JSON.parse(localStorage.getItem("userEmail"));
    const alreadyRedirected = localStorage.getItem("redirectedToOTP");

    // Debugging logs
    console.log("Activation Token:", activationToken);
    console.log("Raw Approved Teachers Data:", storedTeachers);
    console.log("User Email from localStorage:", userEmail);
    console.log("Already Redirected to OTP:", alreadyRedirected);

    // Parse approved teachers safely
    const approvedTeachers = storedTeachers ? JSON.parse(storedTeachers) : [];
    console.log("Parsed Approved Teachers:", approvedTeachers);

    if (userEmail) {
      const approvedUser = approvedTeachers.find(
        (teacher) =>
          teacher.email.trim().toLowerCase() === userEmail.trim().toLowerCase()
      );

      console.log("Approved User:", approvedUser);

      if (approvedUser) {
        console.log("Is Approved:", approvedUser.isApproved);

        if (approvedUser.isApproved) {
          console.log("Redirecting to OTP page...");

          // Redirect only if it hasn't happened before
          if (!alreadyRedirected) {
            alert("OTP sent to your mail");
            localStorage.setItem("redirectedToOTP", "true"); // Set flag in localStorage
            navigate("/otp", { state: { token: activationToken } });
          }
        } else {
          console.log("Teacher registration pending approval...");
          alert("Registration pending approval.");
          navigate("/auth");
        }
      } else {
        console.log("No approved user found.");
      }
    } else {
      console.error("User email is not found in localStorage.");
    }
  }, [navigate]);

 // Or your component JSX



  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await loginUser({
            email: userData.email,
            password: userData.password,
        });
  
        alert(response.data.message);
  
        // Save user data and token in localStorage
        localStorage.setItem("token", response.data.token); // Save token to localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Save user info in localStorage
  
        // Redirect to the specific dashboard URL based on role
        navigate(response.data.dashboardUrl);
    } catch (error) {
        alert(error.response?.data?.message || "Login failed");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,  // Keep the previous state values
      [name]: value, // Dynamically update the corresponding field
    }));
  };

  return (
    <div className="app-container">
    <Link to={'/admin'}>
  <button
    style={{
      borderRadius: "5px 10px 5px 10px",
      position: "relative",
      bottom: "300px",
      left: "800px",
    }}
    onClick={() => {
      localStorage.setItem("userrole", "admin"); // Set role to admin in localStorage
      console.log("Admin role set in localStorage"); // Debugging log
    }}
  >
    Admin
  </button>
</Link>

      {/* Role Selection */}
      {!selectedRole && (
        <div className="role-selection">
           <h1 style={{ color: "rgb(231, 241, 241)", position:"relative",left:"170px", fontSize: "30px" }}>
          Choose your Role
        </h1>
          <button
            style={{
              backgroundColor: "rgb(35, 160, 73)",
              borderRadius: "10px",
              borderColor: "transparent",
              margin: "20px",
              color: "white",
              width: "130px",
              height: "40px",
              marginLeft:"100px"
            }}
            onClick={() => handleRoleSelection("teacher")}
          >
            Teacher
          </button>
          <button
            style={{
              backgroundColor: "rgb(34, 163, 27)",
              borderRadius: "10px",
              borderColor: "transparent",
              margin: "10px",
              color: "white",
              height: "40px",
              width: "130px",
            }}
            onClick={() => handleRoleSelection("student")}
          >
            Student
          </button>
          <button
            style={{
              backgroundColor: "rgb(32, 137, 24)",
              borderRadius: "10px",
              borderColor: "transparent",
              margin: "10px",
              color: "white",
              height: "40px",
              width: "130px",
            }}
            onClick={() => handleRoleSelection("parent")}
          >
            Parent
          </button>
        </div>
      )}

      {/* Login/Signup Form */}
      {selectedRole && (
        <>
          <div className="back-button">
            <button onClick={handleBack} className="btn back-btn">
              Back
            </button>
          </div>

          <div className="screen login-screen">
            <h2>{isLogin ? "Welcome Back" : "Create an Account"}</h2>

            {/* Toggle between Login and Register Form */}
            <form onSubmit={isLogin ? handleLogin : handleRegister}>
              {!isLogin && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={userData.name}
                  onChange={handleInputChange}
                  required
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={userData.password}
                onChange={handleInputChange}
                required
              />
              {/* Role-Specific Inputs */}
              {selectedRole === "teacher" && (
                <>
                  <input
                    type="text"
                    name="teacherId"
                    placeholder="Teacher ID"
                    value={userData.teacherId}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={userData.subject}
                    onChange={handleInputChange}
                  />
                </>
              )}
              {selectedRole === "student" && (
                <>
                  <input
                    type="text"
                    name="rollNumber"
                    placeholder="Roll Number"
                    value={userData.rollNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="class"
                    placeholder="Grade/Class"
                    value={userData.class}
                    onChange={handleInputChange}
                    required
                  />
                </>
              )}

              {selectedRole === "parent" && (
                <>
                  <input type="text" placeholder="Child's Name" required />
                  <input type="text" placeholder="Relationship to Child" required />
                </>
              )}

              <button style={{ borderRadius: "10px", fontSize: "13px" }} className="btn">
                {isLogin ? "Login" : "Register"}
              </button>
            </form>

            <button style={{ borderRadius: "10px", fontSize: "13px" }} onClick={() => setIsLogin(!isLogin)} className="btn toggle-btn">
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Auth;
