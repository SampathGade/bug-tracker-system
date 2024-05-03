import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isFormValid = email && password && validateEmail(email);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Uncomment and modify URL to integrate with real API
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        });
        // Mock response for demonstration
        // const response = { status: 200 }; // Mocking a successful login
//        console.log(response)
        if (response.status === 200) {
            setShowOtpInput(true);
        } else if(response.status === 401) {
            alert('Invalid credentials or other authentication error.');
        }
    };

    const handleOtpSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:8080/auth/verify-otp', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, otp })
        });
//        console.log(response)
        if (response.status === 200) {
            const data = await response.json();
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userEmail', email);
            navigate('/dashboard');
        } else if (response.status === 401) {
            alert('Invalid OTP.');
        } else {
            alert('Error validating OTP, please try again later.');
        }
    };

    return (
        <div className="login-container">
            <h1>Bug Tracker</h1>
            <div className="form-container">
                <h2>Login</h2>
                {!showOtpInput ? (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <button type="submit" disabled={!isFormValid}>Login</button>
                        <button onClick={() => navigate('/forgot-password')}>Forgot Password</button>
                        <button onClick={() => navigate('/signup')}>Sign Up</button>
                    </form>
                ) : (
                    <form onSubmit={handleOtpSubmit}>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="Enter OTP"
                            required
                        />
                        <button type="submit" disabled={!otp}>Validate OTP</button>
                        <button onClick={() => setShowOtpInput(false)}>Regenerate OTP</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginComponent;
