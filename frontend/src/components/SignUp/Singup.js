import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpComponent = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmitEmail = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8080/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (response.status === 200) {
      setShowOtpForm(true);
    } else if (response.status === 409) {
      alert("User already exists.");
    } else {
      alert("Error validating email.");
    }
  };

  const handleRegenerateOTP = async () => {
    const response = await fetch("http://localhost:8080/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (response.status === 200) {
      alert("OTP regenerated. Please check your email.");
      setOtp(""); // Clear the OTP field to allow the user to enter the new OTP
    } else {
      alert("Error regenerating OTP.");
    }
  };

  const handleSubmitDetails = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/auth/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role, otp }),
      });
      if (response.status === 200) {
        navigate("/login", { replace: true });
      } else if (response.status === 401) {
        alert("Invalid OTP");
      } else {
        alert("Error validating OTP, please try again later");
      }
    } catch {
      alert("Error validating OTP, please try again later");
    }
  };

  return (
    <div className="login-container">
      <div className="login-detail-sec">
        <h2>Sign Up</h2>
        <div className="form-container">
          {!showOtpForm ? (
            <form className=" cls-d-f cls-flex-column" onSubmit={handleSubmitEmail}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
              />
              <button
                className="btn-login cls-c-p"
                type="submit"
                disabled={!validateEmail(email)}
              >
                Register
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmitDetails}>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="OTP"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />
              <div className="btn-reset-pass-block">
                <select
                  className="custm-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="projectManager">Project Manager</option>
                  <option value="developer">Developer</option>
                  <option value="tester">Tester</option>
                  <option value="external user">External User</option>
                </select>
                <button
                  className="btn-login cls-c-p"
                  type="submit"
                  disabled={
                    !otp || !password || password !== confirmPassword || !role
                  }
                >
                  Complete Registration
                </button>
                <button
                  className="btn-login cls-c-p"
                  type="button"
                  onClick={handleRegenerateOTP}
                >
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

export default SignUpComponent;
