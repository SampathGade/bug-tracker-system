import React, { useState, useEffect } from 'react';

const EditPersonOverlay = ({ person, onClose }) => {
    const [role, setRole] = useState(person.role);
    const [projectManager, setProjectManager] = useState(person.projectManager || 'Manager A'); // Default to first manager if none is set

    // Managers list could also come from props if they are dynamic or fetched from a backend
    const managers = ['Manager A', 'Manager B', 'Manager C']; 

    useEffect(() => {
        // Initialize project manager to the first one if not set
        if (!person.projectManager) {
            setProjectManager(managers[0]);
        }
    }, [person.projectManager, managers]);

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
                        {managers.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </label>
                <button onClick={handleUpdatePerson}>Update</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default EditPersonOverlay;
