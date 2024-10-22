import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import "./signupForm.css";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // Step 1: Form, Step 2: OTP
  const [successMessage, setSuccessMessage] = useState("");
  
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !mobile || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Simulate OTP generation and sending
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString(); // Generate 4-digit OTP
    setGeneratedOtp(otpCode);
    console.log("OTP sent to email:", otpCode); // This simulates sending the OTP to the user's email
    setStep(2); // Move to OTP verification step
    setError(""); // Clear error
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      setSuccessMessage("Sign Up successful!");
      setError(""); // Clear any error
      console.log("Sign Up successful:", { name, mobile, email, password });
      setTimeout(() => {
        navigate("/"); // Redirect to home page after 2 seconds
      }, 2000);
    } else {
      setError("Invalid OTP, please try again.");
    }
  };

  const handleLoginRedirect = (e) => {
    e.preventDefault();
    navigate("/signin"); // Use navigate to programmatically go to the sign-in page
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      
      {step === 1 && (
        <form onSubmit={handleSubmit} className="signup-form">
          {error && <div className="error">{error}</div>}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="tel"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleOtpSubmit} className="otp-form">
          {error && <div className="error">{error}</div>}
          <div className="form-group">
            <label htmlFor="otp">Enter OTP sent to your email</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
            />
          </div>
          <button type="submit" className="verify-btn">Verify OTP</button>
        </form>
      )}

      {successMessage && <div className="success-message">{successMessage}</div>}

      {step === 1 && (
        <p>
          Already have an account?{" "}
          <a href="/signin" onClick={handleLoginRedirect} className="login-redirect-link">
            Log In
          </a>
        </p>
      )}
    </div>
  );
};

export default SignUpForm;
