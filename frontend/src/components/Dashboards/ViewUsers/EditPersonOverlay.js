import React, { useState, useEffect } from 'react';

const EditPersonOverlay = ({ person, onClose }) => {
    const [role, setRole] = useState(person.role);
    const [managers, setManagers] = useState([]);
    const [projectManager, setProjectManager] = useState(person.projectManager || '');

    useEffect(() => {
        const fetchManagers = async () => {
            try {
                const response = await fetch('http://localhost:8080/users/getProjectManagers');
                if (response.ok) {
                    const managerData = await response.json();
                    setManagers(managerData.map(manager => manager.email));
                    // Initialize project manager to the existing value or the first one if not set
                    if (!person.projectManager && managerData.length > 0) {
                        setProjectManager(managerData[0].email);
                    }
                } else {
                    throw new Error('Failed to fetch managers');
                }
            } catch (error) {
                console.error('Error fetching managers:', error);
            }
        };

        fetchManagers();
    }, [person.projectManager]);

    const handleUpdatePerson = async () => {
        const updatedDetails = { email: person.email, role, projectManager };
        const response = await fetch('http://localhost:8080/people/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedDetails)
        });
        if (response.ok) {
            onClose();  // Close the overlay and potentially refresh the list
        }
    };

    return (
        <div className="overlay" onClick={() => onClose()}>
            <div className="overlay-content" onClick={e => e.stopPropagation()}>
                <h2>Edit Person</h2>
                <p>Email: {person.email}</p>
                <label>
                    Role:
                    <select value={role} onChange={e => setRole(e.target.value)} disabled={role === 'admin'}>
                        <option value="developer">Developer</option>
                        <option value="tester">Tester</option>
                        <option value="projectManager">Project Manager</option>
                        <option value="admin">Admin</option>
                    </select>
                </label>
                <label>
                    Project Manager:
                    <select value={projectManager} onChange={e => setProjectManager(e.target.value)}>
                        {managers.map(email => (
                            <option key={email} value={email}>
                                {email}
                            </option>
                        ))}
                    </select>
                </label>
                <div className='form-actions'>
                    <button onClick={handleUpdatePerson}>Update</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditPersonOverlay;
