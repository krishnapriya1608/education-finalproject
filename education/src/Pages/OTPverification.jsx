import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // For navigation
import { verifyOtp } from "../Service/allAPI";  // Import the OTP verification function

const OtpVerification = () => {
  const [otp, setOtp] = useState("");  // State to store OTP input
  const navigate = useNavigate();  // Hook for navigation
  const activationToken = localStorage.getItem("activationToken");  // Retrieve token from localStorage

  if (!activationToken) {
    alert("Activation token not found. Please try again.");
    navigate("/auth");  // Navigate back to the registration page if token is not found
    return;
  }
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    // Check if OTP is entered
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }

    try {
      // Call the verifyOtp function and pass the OTP and token
      const response = await verifyOtp(otp, activationToken);
      
      if (response?.data?.message === "User verified successfully") {
        alert("OTP Verified Successfully!");
        navigate("/dashboard");  // Navigate to the dashboard or home page after successful OTP verification
      } else {
        alert("Incorrect OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      alert("OTP verification failed. Please try again later.");
    }
  };

  return (
    <div className="screen otp-screen">
      <h2>OTP Verification</h2>
      <form onSubmit={handleOtpSubmit}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}  // Update OTP state
          required
        />
        <button type="submit" className="btn">Verify OTP</button>
      </form>
    </div>
  );
};

export default OtpVerification;
