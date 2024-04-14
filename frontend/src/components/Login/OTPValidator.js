import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthContext';
import styles from './OTPValidation.module.css';

const OTPValidationPage = () => {
    const [otp, setOTP] = useState('');
    const [isInvalidOTP, setIsInvalidOTP] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const purpose = location.state?.purpose;

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (purpose !== "signup" && purpose !== "login") {
            navigate('/login');
        }
    }, [purpose, navigate]);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            // Customize the standard message (the exact message may not be shown in modern browsers)
            event.preventDefault(); 
            event.returnValue = ''; // Chrome requires returnValue to be set
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    const handleOTPValidation = async () => {
        try {
            const response = await fetch('http://localhost:8080/otp/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userEmail: user.userEmail, otp: otp }),
            });

            if (response.ok) {
                const responseData = await response.json();
                if (responseData.isValid) {
                    if (purpose === 'login') {
                        navigate('/dashboard'); 
                    } else {
                        navigate('/successfulSignUp')
                    }
                } else {
                    setIsInvalidOTP(true);
                }
            } else {
                setIsInvalidOTP(true);
            }
        } catch (error) {
            console.error('Error validating OTP:', error);
            setIsInvalidOTP(true);
        }
    };

    const handleResendOTP = async () => {
        try {
            const response = await fetch('http://localhost:8080/otp/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userEmail: user.userEmail }),
            });

            if (response.ok) {
                console.log('OTP resent successfully');
            } else {
                console.error('Failed to resend OTP');
            }
        } catch (error) {
            console.error('Error resending OTP:', error);
        }
    };

    const isSubmitDisabled = otp.trim() === '';

    return (
        <div className={styles.container}>
            <div className={styles.otpForm}>
                <h2 className={styles.title}>OTP Validation</h2>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    className={styles.input}
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                />
                {isInvalidOTP && <p className={styles.error}>Invalid OTP. Please try again or resend OTP.</p>}
                <button onClick={handleOTPValidation} className={styles.button} disabled={isSubmitDisabled}>Submit</button>
                <button onClick={handleResendOTP} className={styles.button}>Resend OTP</button>
            </div>
        </div>
    );
};

export default OTPValidationPage;
