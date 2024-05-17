import {
  Card,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUpComponent = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isExternalUser, setIsExternalUser] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmitEmail = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8080/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, isExternalUser }),
    });
    if (response.status === 200) {
      setShowOtpForm(true);
    } else if (response.status === 409) {
      toast("User already exists.");
    } else {
      toast("Error validating email.");
    }
  };

  const handleRegenerateOTP = async () => {
    const response = await fetch("http://localhost:8080/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (response.status === 200) {
      toast("OTP regenerated. Please check your email.");
      setOtp(""); // Clear the OTP field to allow the user to enter the new OTP
    } else {
      toast("Error regenerating OTP.");
    }
  };

  const handleExternalUserChange = (e) => {
    const checked = e.target.checked;
    setIsExternalUser(checked);
  };

  const toggleExternalUser = () => {
    setIsExternalUser(!isExternalUser);
    setRole("");
    setShowOtpForm(true);
  };

  const handleSubmitDetails = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast("Passwords do not match.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/auth/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role, otp, firstName, lastName}),
      });
      if (response.status === 200) {
        navigate("/login", { replace: true });
      } else if (response.status === 401) {
        toast("Invalid OTP");
      } else {
        toast("Error validating OTP, please try again later");
      }
    } catch {
      toast("Error validating OTP, please try again later");
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
          <h2>Sign Up</h2>
          <div className="form-container">
            {!showOtpForm ? (
              <form
                className=" cls-d-f cls-flex-column"
                onSubmit={handleSubmitEmail}>
                <TextField
                  id="outlined-basic"
                  label="Email Address"
                  variant="outlined"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "10px",
                  }}>
                  <Checkbox
                    checked={isExternalUser}
                    onChange={handleExternalUserChange}
                  />
                  <Typography>I'm an external user</Typography>
                </div>
                <button
                  className="btn-login cls-c-p"
                  type="submit"
                  disabled={!validateEmail(email)}>
                  Register
                </button>
              </form>
            ) : (
              <>
                <form
                  className="cls-d-f cls-flex-column"
                  onSubmit={handleSubmitDetails}>
                  <TextField
                    label="OTP"
                    variant="outlined"
                    required
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                    }}
                  />
                  <TextField
                    label="First Name"
                    variant="outlined"
                    required
                    value={firstName} // Bind to state
                    onChange={(e) => setFirstName(e.target.value)}
                  />;
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)} 
                  />;
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                    }}
                  />
                  <TextField
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                    }}
                  />
                  <FormControl required sx={{ m: 0, width: "100%" }}>
                    <InputLabel id="demo-simple-select-required-label">
                      Select Role
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={role}
                      style={{
                        marginBottom: "10px",
                        textAlign: "left",
                        width: "100%",
                      }}
                      placeholder="Select Role"
                      label="Select Role"
                      onChange={(e) => setRole(e.target.value)}>
                      <MenuItem value="projectManager">
                        Project Manager
                      </MenuItem>
                      <MenuItem value="developer">Developer</MenuItem>
                      <MenuItem value="tester">Tester</MenuItem>
                    </Select>
                  </FormControl>
                  <button
                    className="btn-login cls-c-p bg-cyan-200"
                    type="submit"
                    disabled={
                      !otp || !password || password !== confirmPassword || !role
                    }
                    style={{ marginBottom: "10px" }}>
                    Complete Registration
                  </button>
                  <button
                    className="btn-login cls-c-p"
                    type="button"
                    onClick={handleRegenerateOTP}>
                    Regenerate OTP
                  </button>
                </form>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUpComponent;
