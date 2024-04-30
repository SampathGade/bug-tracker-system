import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpComponent = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [showOtpForm, setShowOtpForm] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    const handleSubmitEmail = async (event) => {
        event.preventDefault();
        // API call to register email and request OTP
        // Mocked response
        const response = { status: 200 }; // Assuming successful response
        if (response.status === 200) {
            setShowOtpForm(true);
        } else if (response.status === 409) {
            alert('User already exists.');
        } else {
            alert('Error validating email.');
        }
    };

    const handleSubmitDetails = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
        // API call to verify OTP and register the user
        navigate('/login', { replace: true });
    };

    return (
        <div className="login-container">
            <div className="form-container">
                <h2>Sign Up</h2>
                {!showOtpForm ? (
                    <form onSubmit={handleSubmitEmail}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            required
                        />
                        <button type="submit" disabled={!validateEmail(email)}>Register</button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmitDetails}>
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
                        <select
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
                        <button type="submit" disabled={!otp || !password || password !== confirmPassword || !role}>
                            Complete Registration
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SignUpComponent;
