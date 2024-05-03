import React, { useState } from 'react';

const EditUserOverlay = ({ user, onClose, onStatusChange }) => {
    const [role, setRole] = useState(user.role);
    const [projectManager, setManager] = useState('');

    const managers = ['Manager A', 'Manager B', 'Manager C']; // Static data for now

    const handleSubmit = async (status) => {
        const payload = { email: user.email, role, projectManager, status };
        const response = await fetch('http://localhost:8080/auth/updateStatus', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            onClose(); // Close overlay if successful
            onStatusChange(); // Trigger refresh in parent component
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="overlay" onClick={handleOverlayClick}>
            <div className="overlay-content" onClick={e => e.stopPropagation()}>
                <h2>Edit User</h2>
                <p>Email: {user.email}</p>
                <label>
                    Role:
                    <select value={role} onChange={e => setRole(e.target.value)}>
                        <option value="Developer">Developer</option>
                        <option value="Tester">Tester</option>
                        <option value="Project Manager">Project Manager</option>
                    </select>
                </label>
                <label>
                    Project Manager:
                    <select value={projectManager} onChange={e => setManager(e.target.value)}>
                        {managers.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </label>
                <button onClick={() => handleSubmit('accepted')}>Accept</button>
                <button onClick={() => handleSubmit('rejected')}>Reject</button>
            </div>
        </div>
    );
};

export default EditUserOverlay;
