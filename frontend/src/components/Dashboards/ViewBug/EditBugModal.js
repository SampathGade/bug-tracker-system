import React, { useState } from 'react';
import './BugComponent.css';

const EditBugModal = ({ bug, onClose }) => {
    const [name, setName] = useState(bug.name);
    const [description, setDescription] = useState(bug.description);
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state to true
    
        const updateData = {
            id: bug.id,
            name: name,
            description: description
        };
    
        try {
            const response = await fetch('http://localhost:8080/bug/updateBug', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updateData)
            });
    
            if (response.ok) {
                console.log('Bug updated successfully');
                onClose(); // Close the modal after submission
            } else {
                // If response is not OK, handle errors
                const errorData = await response.json();
                console.error('Error details:', errorData);
                alert(`Failed to update the bug: ${errorData.message || 'Please try again'}.`);
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error. Please try again.');
        } finally {
            setIsLoading(false); // Reset loading state regardless of outcome
        }
    };

    return (
        <div className="overlay">
    <div className="overlay-content" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
            <h2>Edit Bug</h2>
            <label>
                Title:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} />
            </label>
            <label>
                Description:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required disabled={isLoading} />
            </label>
            <div className='form-actions'>
                <button type="submit" disabled={isLoading}>{isLoading ? 'Updating...' : 'Update Bug'}</button>
                <button type="button" onClick={onClose} disabled={isLoading}>Cancel</button>
            </div>
        </form>
    </div>
</div>
    );
};

export default EditBugModal;
