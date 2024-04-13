import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
    const [projectName, setProjectName] = useState('');
    const [projectManager, setProjectManager] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!projectName) {
                console.error('Project Name is required');
                return;
            }

            // Make API call to create project
            // const response = await fetch('YOUR_CREATE_PROJECT_API_URL', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ projectName, projectManager }),
            // });
            // const data = await response.json();
            
            // Simulated response
            const data = { success: true }; // Assuming success response

            if (data.success) {
                // If project creation is successful, navigate back to Dashboard
                navigate("/dashboard");
            } else {
                // Handle error case
                console.error('Failed to create project');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Create Project</h2>
            <form onSubmit={handleSubmit}>
                <label>Project Name:</label>
                <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} required />
                <label>Project Manager:</label>
                <input type="text" value={projectManager} onChange={(e) => setProjectManager(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateProject;
