import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardPerson = () => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setIsLoading(true);
        setError('');
    
        try {
            // Make API call to onboard a person
            // const response = await fetch('YOUR_ONBOARD_API_URL', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ email, role }),
            // });
            // const data = await response.json();
            // Simulated response
            const data = { success: true }; // Assuming success response
    
            if (data.success) {
                setIsSuccess(true);
                navigate('/onboard');
            } else {
                setError('Failed to onboard the person. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while processing your request. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Onboard a Person</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Role:</label>
                <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required />
                <button type="submit" disabled={isLoading}>Submit</button>
            </form>
            {isLoading && <p>Loading...</p>}
            {isSuccess && <p>Person onboarded successfully!</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default OnboardPerson;
