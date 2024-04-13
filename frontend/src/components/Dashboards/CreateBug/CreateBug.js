import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBug = () => {
    const [bugName, setBugName] = useState('');
    const [bugType, setBugType] = useState('');
    const [expectedOutput, setExpectedOutput] = useState('');
    const [currentOutput, setCurrentOutput] = useState('');
    const [assignee, setAssignee] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!bugName || !bugType) {
                console.error('Bug Name and Bug Type are required');
                return;
            }

            // Make API call to create bug
            // const response = await fetch('YOUR_CREATE_BUG_API_URL', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ bugName, bugType, expectedOutput, currentOutput, assignee }),
            // });
            // const data = await response.json();
            
            // Simulated response
            const data = { success: true }; // Assuming success response

            if (data.success) {
                // If bug creation is successful, navigate back to Dashboard
                navigate("/dashboard");
            } else {
                // Handle error case
                console.error('Failed to create bug');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Create Bug</h2>
            <form onSubmit={handleSubmit}>
                <label>Bug Name:</label>
                <input type="text" value={bugName} onChange={(e) => setBugName(e.target.value)} required />
                <label>Bug Type:</label>
                <input type="text" value={bugType} onChange={(e) => setBugType(e.target.value)} required />
                <label>Expected Output:</label>
                <input type="text" value={expectedOutput} onChange={(e) => setExpectedOutput(e.target.value)} />
                <label>Current Output:</label>
                <input type="text" value={currentOutput} onChange={(e) => setCurrentOutput(e.target.value)} />
                <label>Assignee:</label>
                <input type="text" value={assignee} onChange={(e) => setAssignee(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateBug;
