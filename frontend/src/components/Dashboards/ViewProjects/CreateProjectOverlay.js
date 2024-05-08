import React, { useState } from 'react';

const CreateProjectOverlay = ({ onClose }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleCreateProject = async () => {
        const newProjectDetails = { name, description };
        const response = await fetch('http://localhost:8080/project/createProject', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProjectDetails)
        });
        if (response.ok) {
            onClose(); // Close the overlay and potentially refresh the project list
        } else {
            console.error('Failed to create project'); // Handle errors appropriately
        }
    };

    return (
        <div className="overlay" onClick={onClose}>
            <div className="overlay-content" onClick={e => e.stopPropagation()}>
                <h2>Create New Project</h2>
                <label>
                    Project Name:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    Description:
                    <textarea value={description} onChange={e => setDescription(e.target.value)} />
                </label>
                <div className='form-actions'>
                <button onClick={handleCreateProject}>Create</button>
                <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CreateProjectOverlay;
