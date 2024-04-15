import React, { useState } from 'react';
import './Login.css'; // Ensure this points to your updated CSS file path

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const processErrorMessage = (error) => {
        switch (error.status) {
            case 401:
                return "Credentials invalid. Please try again.";
            case 404:
                return "Error: The server endpoint was not found.";
            case 500:
                return "Error: Server error. Please try again later.";
            default:
                return "An unexpected error occurred.";
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        // Replace with your actual API endpoint
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            setShowOtpInput(true);
            setErrorMessage('');
        } else {
            const error = await response.json();
            setErrorMessage(processErrorMessage(error));
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        // Replace with your actual API endpoint
        const response = await fetch('/api/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        });

        if (response.ok) {
            // Save authenticated user
            localStorage.setItem('user', JSON.stringify({ email }));
            // Redirect to dashboard
            window.location.href = '/dashboard';
        } else {
            const error = await response.json();
            setErrorMessage(processErrorMessage(error));
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {!showOtpInput ? (
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <button
                            type="submit"
                            disabled={!email || !password}
                        >
                            Login
                        </button>
                    </form>
                ) : (
                    <form onSubmit={verifyOtp}>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            required
                        />
                        <button type="submit" disabled={!otp.trim()}> {/* Disabled until OTP is entered */}
                            Verify OTP
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Login;
