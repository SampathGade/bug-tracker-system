import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

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
        await sendOtpRequest();
    };

    const sendOtpRequest = async () => {
        try {
        const response = await fetch('http://localhost:3000/auth/verify-email-password', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email })
        });

        if (response.status === 200) {
            setShowResetForm(true);
        } else if (response.status === 401) {
            alert('No user found with that email.');
        } else {
            alert('Error sending OTP, please try again later.');
        }
    }catch{
        alert('Error sending OTP, please try again later.');
    }
    };

    const handleResetSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
        try {
        const response = await fetch('http://localhost:3000/auth/reset-password', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, otp, password })
        });

        if (response.status === 200) {
            alert('Password reset successfully.');
            navigate('/login');
        } else if (response.status === 401) {
            alert('Invalid OTP.');
        } else {
            alert('Error resetting password, please try again later.');
        }
    }catch {
        alert('Error resetting password, please try again later.');
    }
    };

    const handleResendOtp = async () => {
        setOtp(''); // Clear current OTP input
        await sendOtpRequest(); // Resend OTP
    };

    const isResetEnabled = otp && password && confirmPassword && password === confirmPassword;

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
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="OTP"
                            required
                        />
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
                        <button type="submit" disabled={!isResetEnabled}>Reset Password</button>
                        <button type="button" onClick={handleResendOtp}>Resend OTP</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordComponent;
