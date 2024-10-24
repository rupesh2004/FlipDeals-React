import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signupForm.css";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !mobile || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          mobile,
          email,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Account Created Successfully");
        setName('');
        setMobile('');
        setEmail('');
        setPassword('');
        navigate('/signin');
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Failed to create account");
    }
  };

  const handleLoginRedirect = (e) => {
    e.preventDefault();
    navigate("/signin");
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} className="signup-form" method="POST">
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            name="name"
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
            name="mobile"
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
            name="email"
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
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <p>
        Already have an account?{" "}
        <a href="/signin" onClick={handleLoginRedirect} className="login-redirect-link">
          Log In
        </a>
      </p>
    </div>
  );
};

export default SignUpForm;
