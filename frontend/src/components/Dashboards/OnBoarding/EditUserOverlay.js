import React, { useState, useEffect } from 'react';

const EditUserOverlay = ({ user, onClose, onStatusChange }) => {
    const [role, setRole] = useState(user.role);
    const [managers, setManagers] = useState([]); // Initialize managers as an empty array
    const [projectManager, setManager] = useState(user.projectManager);

    useEffect(() => {
        const fetchManagers = async () => {
            const response = await fetch('http://localhost:8080/users/getProjectManagers'); // Adjust URL as needed
            if (response.ok) {
                const data = await response.json();
                setManagers(data);
                // Initialize projectManager with the email of the first manager or an existing value
                setManager(user.projectManager || (data.length > 0 && data[0].email));
            }
        };

        fetchManagers();
    }, [user.projectManager]); // Ensure this effect runs only once or when user.projectManager changes

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
                        <option value="projectManager">Project Manager</option>
                        <option value="External User">External User</option>
                    </select>
                </label>
                <label>
                    Project Manager:
                    <select value={projectManager} onChange={e => setManager(e.target.value)}>
                        {managers.map(manager => (
                            <option key={manager.email} value={manager.email}>{manager.email}</option>
                        ))}
                    </select>
                </label>
                <button onClick={() => handleSubmit('accepted')}>Accept</button>
                <button onClick={() => handleSubmit('rejected')}>Reject</button>
            </div>
        </div>
    );
};

export default EditUserOverlay;
