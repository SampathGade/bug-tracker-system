import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const ForgotPasswordComponent = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showResetForm, setShowResetForm] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleEmailSubmit = async (event) => {
        event.preventDefault();
        // API call to send OTP
        // Uncomment and modify URL to integrate with real API
        // const response = await fetch('/api/forgot-password', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({ email })
        // });
        // Assume response is successful for demonstration
        setShowResetForm(true);
    };

    const handleResetSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
        // API call to reset password
        navigate('/login');
    };

    return (
        <div className="login-container">
            <div className="form-container">
                <h2>Forgot Password</h2>
                {!showResetForm ? (
                    <form onSubmit={handleEmailSubmit}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                        <button type="submit" disabled={!validateEmail(email)}>Send OTP</button>
                        <button onClick={() => navigate('/login')}>Back to Login</button>
                    </form>
                ) : (
                    <form onSubmit={handleResetSubmit}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="New Password"
                            required
                        />
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm New Password"
                            required
                        />
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="OTP"
                            required
                        />
                        <button type="submit">Reset Password</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordComponent;
