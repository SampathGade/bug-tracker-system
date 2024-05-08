import React, { useState } from 'react';
import './BugComponent.css';

const EditBugModal = ({ bug, onClose }) => {
    const [name, setName] = useState(bug.name);
    const [description, setDescription] = useState(bug.description);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(bug)

        const updateData = {
            id: bug.id,
            name: name,
            description: description
        };

        try {
            const response = await fetch('http://localhost:8080/bug/updateBug', {  // Replace 'http://your-api-url/bug/update' with your actual API URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                // Handle success
                console.log('Bug updated successfully');
                onClose(); // Close the modal after submission
            } else {
                // Handle errors
                console.error('Failed to update bug');
                const errorData = await response.json();
                console.error('Error details:', errorData);
                alert('Failed to update the bug. Please try again.');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error. Please try again.');
        }
    };

    return (
        <div className="overlay">
            <div className="overlay-content" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <h2>Edit Bug</h2>
                    <label>
                        Title:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                    <label>
                        Description:
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </label>
                    <div className='form-actions'>
                        <button type="submit">Update Bug</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBugModal;
