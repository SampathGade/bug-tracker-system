import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (localStorage.getItem("userEmail")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = email && password && validateEmail(email);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        setShowOtpInput(true);
      } else if (response.status === 401) {
        alert("Invalid credentials or other authentication error.");
      } else {
        alert("Issue Validating credentials, Please try again");
      }
    } catch {
      alert("Issue Validating credentials, Please try again");
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userId", data.id);
        navigate("/dashboard");
      } else if (response.status === 401) {
        alert("Invalid OTP.");
      } else {
        alert("Error validating OTP, please try again later.");
      }
    } catch {
      alert("Error validating OTP, please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-detail-sec">
        <h1>Bug Tracker</h1>
        <div className="form-container">
          {/* <h2>Login</h2> */}
          {!showOtpInput ? (
            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="input-field">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="btn-block">
              <button className="btn-frgt-pass cls-c-p" onClick={() => navigate("/forgot-password")}>
                Forgot Password
              </button>
              <button className="btn-login cls-c-p" type="submit" disabled={!isFormValid}>
                Login
              </button>
              <div className="btn-sign-up ">
                <span>Don’t have an account?</span>
              <button className="btn-sign-up-text cls-c-p" onClick={() => navigate("/signup")}>Sign Up</button>
              </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit}>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="Enter OTP"
                required
              />
              <div className="btn-reset-pass-block">
              <button className="btn-login cls-c-p" type="submit" disabled={!otp}>
                Validate OTP
              </button>
              <button className="btn-login cls-c-p" onClick={() => setShowOtpInput(false)}>
                Regenerate OTP
              </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="login-img"></div>
    </div>
  );
};

export default LoginComponent;
