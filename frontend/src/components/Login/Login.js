import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { Card } from "@mui/material";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userEmail")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = email && password && validateEmail(email);

  const fetchIpAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Failed to fetch IP address:", error);
      return null;
    }
  };

  const fetchCurrentSprint = async () => {
    try {
      const response = await fetch("http://localhost:8080/sprint/current");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("currentSprint", data.sprint);
      } else {
        console.error("Failed to fetch current sprint");
      }
    } catch (error) {
      console.error("Error fetching current sprint:", error);
    }
  };

  const handleNavigation = async () => {
    await fetchCurrentSprint();
    navigate("/dashboard");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ip = await fetchIpAddress();
    if (!ip) {
      alert("Unable to fetch IP address. Please try again later.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, ip }),
      });

      if (response.status === 207) {
        const data = await response.json();
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userId", data.id);
        handleNavigation();
      } else if (response.status === 200) {
        setShowOtpInput(true);
      } else if (response.status === 401) {
        toast.error("Invalid credentials or other authentication error.");
      } else {
        toast.error("Issue Validating credentials, Please try again");
      }
    } catch {
      toast.error("Network error, please try again.");
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    const ip = await fetchIpAddress();
    if (!ip) {
      alert("Unable to fetch IP address. Please try again later.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, ip }),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userId", data.id);
        handleNavigation();
      } else if (response.status === 401) {
        alert("Invalid OTP.");
        toast.e("Error validating OTP, please try again later.");
      } else {
        toast("Error validating OTP, please try again later.");
      }
    } catch {
      toast("Network error, please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-detail-sec">
        <Card
          sx={{
            padding: "30px",
            borderRadius: "30px",
          }}>
          <h1>Bug Tracker</h1>
          <div className="form-container">
            {!showOtpInput ? (
              <form onSubmit={handleSubmit}>
                <div className="input-field">
                  <TextField
                    id="outlined-basic"
                    label="Enter your email"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
                <div className="input-field">
                  <TextField
                    id="outlined-basic"
                    label="Enter your password"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "100%",
                      marginTop: "20px",
                    }}
                  />
                </div>
                <div className="btn-block">
                  <button
                    className="btn-frgt-pass cls-c-p"
                    onClick={() => navigate("/forgot-password")}
                    style={{
                      textAlign: "right",
                      marginTop: "10px",
                    }}>
                    Forgot password?
                  </button>
                  <button
                    className="btn-login cls-c-p"
                    type="submit"
                    disabled={!isFormValid}>
                    Login
                  </button>
                  <div className="btn-sign-up ">
                    <span>Don’t have an account?</span>
                    <button
                      className="btn-sign-up-text cls-c-p"
                      onClick={() => navigate("/signup")}>
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit}>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  placeholder="Enter OTP"
                  required
                />
                <div className="btn-reset-pass-block">
                  <button
                    className="btn-login cls-c-p"
                    type="submit"
                    disabled={!otp}>
                    Validate OTP
                  </button>
                  <button
                    className="btn-login cls-c-p"
                    onClick={() => setShowOtpInput(false)}>
                    Regenerate OTP
                  </button>
                </div>
              </form>
            )}
          </div>
        </Card>
      </div>
      {/* <div className="login-img"></div> */}
    </div>
  );
};

export default LoginComponent;
