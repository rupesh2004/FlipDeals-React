import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./forgotPassword.css";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Initialize the useNavigate hook
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !newPassword) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        setEmail(""); // Clear email input
        setNewPassword(""); // Clear password input
        
        // Redirect to login after successful password reset
        setTimeout(() => {
          navigate("/signin"); // Navigate to the login page
        }, 2000); // Optional delay before redirecting
      } else {
        setError(data.message || "Error resetting password");
      }
    } catch (error) {
      setError("Error resetting password");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
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
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            required
          />
        </div>
        <button type="submit" className="reset-btn">Reset Password</button>
      </form>
      <p>
        Remember your password?{" "}
        <a href="/signin" className="login-redirect-link">
          Log In
        </a>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
