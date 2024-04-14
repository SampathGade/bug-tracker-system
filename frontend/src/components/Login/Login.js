import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthContext';
import styles from './login.module.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userEmail: email, password }),
            });
    
            if (response.ok) {
                const responseData = await response.json();
                login(responseData);
                // Attempt to generate OTP before navigation
                const otpResponse = await fetch('http://localhost:8080/otp/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userEmail: email }), // Assuming OTP is based on email
                });

                if (otpResponse.ok) {
                    navigate('/otp-validation', { state: { purpose: 'login' } });
                } else {
                    setErrorMessage('Issue with OTP generation. Please try again.');
                }
            } else {
                if (response.status === 401) {
                    setErrorMessage('Invalid email or password. Please try again.');
                } else {
                    setErrorMessage('An error occurred. Please try again later.');
                }
            }
        } catch (error) {
            console.error('Error occurred while logging in:', error);
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
