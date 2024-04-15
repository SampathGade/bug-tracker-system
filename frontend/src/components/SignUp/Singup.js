import React, { useState } from 'react';
import './SignUp.css'; // Ensure CSS is properly linked

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');  // State to handle success message

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch('http://localhost:8080/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role })
        });

        if (response.ok) {
            setShowOtpInput(true);
            setErrorMessage('');
        } else {
            const errorText = await response.text();
            setErrorMessage(errorText || "Failed to send OTP. Please try again.");
        }
        setLoading(false);
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch('http://localhost:8080/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        });

        if (response.ok) {
            setSuccessMessage("Sign Up request raised successfully!");
            setTimeout(() => {  // Navigate to login after showing success message
                window.location.href = '/login';
            }, 3000);  // Delay for 3 seconds before redirecting
        } else {
            const errorText = await response.text();
            setErrorMessage(errorText || "OTP verification failed. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="signup-container">
            <h1>Sign Up</h1> 
            <div className="signup-form">
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
                {!showOtpInput ? (
                    <form onSubmit={handleSignUp}>
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
                        <select value={role} onChange={(e) => setRole(e.target.value)} required>
                            <option value="">Select role</option>
                            <option value="admin">Admin</option>
                            <option value="projectManager">Project Manager</option>
                            <option value="developer">Developer</option>
                            <option value="qa">QA</option>
                            <option value="externalPerson">External Person</option>
                        </select>
                        <button type="submit" disabled={!email || !password || !role || loading}>
                            Request OTP
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
                        <button type="submit" disabled={!otp || loading}>
                            Verify OTP
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SignUp;
