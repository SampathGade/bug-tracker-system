import React, { useState } from 'react';
import './BugComponent.css'


const EditBugModal = ({ bug, onClose }) => {
    const [name, setName] = useState(bug.name);
    const [description, setDescription] = useState(bug.description);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you would handle the API call to update the bug
        console.log('Updating Bug:', bug.id, name, description);
        onClose(); // Close the modal after submission
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
