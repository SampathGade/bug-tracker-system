import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './login.module.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');  // State for storing error message
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
            response.role = "admin"
            
            if (response.status === 200) {
                // Navigate to OTP validation or another page on successful login
                navigate('/otp-validation', { state: { purpose: 'login', response: response } });
            } else if (response.status === 401) {
                // Set the error message for invalid credentials
                setErrorMessage('Invalid email or password. Please try again.');
            }
        } catch (error) {
            console.error('Error occurred while logging in:', error);
            // Set the error message for network or other errors
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    const isLoginDisabled = email.trim() === '' || password.trim() === '';

    return (
        <div className={styles.container}>
            <div className={styles.loginForm}>
                <h2 className={styles.title}>Login to Your Account</h2>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>} 
                <input type="email" placeholder="Email" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin} className={styles.button} disabled={isLoginDisabled}>Login</button>
                <p className={styles.signupText}>
                    Don't have an account? <Link to="/signup" className={styles.signupLink}>Sign up here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
