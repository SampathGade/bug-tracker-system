import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            // Make API call to register user and generate OTP
            // const response = await fetch('YOUR_SIGNUP_API_URL', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ email, password }),
            // });

            // Simulated response
            const response = { status: 200 };

            if (response.status === 200) {
                // Navigate to OTP validation page
                navigate('/otp-validation', { state: { purpose: 'signup', response : null } });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const isSignUpDisabled = email.trim() === '';

    return (
        <div>
            <h1>Sign Up</h1>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleSignUp} disabled={isSignUpDisabled}>Sign Up</button>
        </div>
    );
};

export default SignUpPage;
