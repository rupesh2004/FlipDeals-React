import React, { useState } from "react";
import "./forgotPassword.css"; // Make sure to have styles similar to the signup form

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !newPassword) {
      setError("Please fill in all fields");
      return;
    }

    // Simulate password reset logic
    console.log("Password reset for:", { email, newPassword });
    setSuccessMessage("Your password has been successfully reset!");
    setError(""); // Clear error
    setEmail(""); // Clear email input
    setNewPassword(""); // Clear password input
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
