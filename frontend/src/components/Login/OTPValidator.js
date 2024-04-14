import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './OTPValidation.module.css';

const OTPValidationPage = () => {
    const [otp, setOTP] = useState('');
    const [isInvalidOTP, setIsInvalidOTP] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const purpose = location.state?.purpose;

    useEffect(() => {
        if (purpose !== "signup" && purpose !== "login") {
            navigate('/login');
        }
    }, [purpose, navigate]);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            // Set a flag for the reload
            sessionStorage.setItem("reloading", "true");

            // Show a confirmation dialog
            const message = "Are you sure you want to leave? All progress will be lost.";
            event.returnValue = message; // Standard for most browsers
            return message; // For supporting older browsers
        };

        if (sessionStorage.getItem("reloading")) {
            sessionStorage.removeItem("reloading");
            const userConfirmed = window.confirm("Are you sure you want to leave? All progress will be lost.");
            if (userConfirmed) {
                navigate('/login');
            } else {
                // Optionally handle the case where user chooses not to navigate away
            }
        }

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [navigate]);

    const handleOTPValidation = async () => {
        // Existing validation logic here...
    };

    const handleResendOTP = async () => {
        console.log('Resend OTP requested');
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
                {isInvalidOTP && <p className={styles.error}>Invalid OTP. Please try again.</p>}
                <button onClick={handleOTPValidation} className={styles.button} disabled={isSubmitDisabled}>Submit</button>
                <button onClick={handleResendOTP} className={styles.button}>Resend OTP</button>
            </div>
        </div>
    );
};

export default OTPValidationPage;
