import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // Make API call to validate credentials
            // const response = await fetch('your_login_api_url', {
            //     method: 'POST',
            //     headers: {
            //     'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ email, password }),
            // });

            const response = {}
            response.status = 200
            
            if (response.status === 200) {
                // Redirect to OTP validation page
                navigate('/otp-validation', { state: { purpose: 'login' } });
            } else if (response.status === 401) {
                // Redirect to InvalidCredentials page
                navigate('/invalid-credentials');
            }
        } catch (error) {
            console.error('Error occurred while logging in:', error);
        }
    };

    // Function to check if email and password are not empty
    const isLoginDisabled = email.trim() === '' || password.trim() === '';

    return (
        <div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin} disabled={isLoginDisabled}>Login</button>
            <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
        </div>
    );
};

export default Login;
