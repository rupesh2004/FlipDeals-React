import React, { useState } from "react";
import "./loginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Please enter both email and password");
      return;
    }
    console.log("Login successful with email:", email, "and password:", password);
    setError(""); // Reset error on successful submission
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
    window.location.href = "/forgotPassword"; // Corrected 'href'
  };

  const handleCreateAccount = () => {
    console.log("Create account clicked");
    window.location.href = "/signup"; // Add actual redirection to sign up page
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
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
            autoComplete="off"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="button"
          onClick={handleForgotPassword}
          className="forgot-password-btn"
        >
          Forgot Password?
        </button>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <a href="/signup" onClick={handleCreateAccount} className="create-account-link">
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
