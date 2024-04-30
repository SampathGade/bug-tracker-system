import React, { useState } from 'react';
import './BugComponent.css'


const EditBugModal = ({ bug, onClose }) => {
    const [title, setTitle] = useState(bug.title);
    const [description, setDescription] = useState(bug.description);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you would handle the API call to update the bug
        console.log('Updating Bug:', bug.id, title, description);
        onClose(); // Close the modal after submission
    };

    return (
        <div className="overlay">
            <div className="overlay-content" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <h2>Edit Bug</h2>
                    <label>
                        Title:
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </label>
                    <label>
                        Description:
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </label>
                    <button type="submit">Update Bug</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditBugModal;
