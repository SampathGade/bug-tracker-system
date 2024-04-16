import React, { useState, useEffect, useRef } from 'react';
import './Project.css';

const ProjectDetailsPopup = ({ project, onClose, onProjectUpdated, currentUser }) => {
    const [details, setDetails] = useState(project);
    const [projectManagers, setProjectManagers] = useState([]);
    const [developers, setDevelopers] = useState([]);
    const [selectedDevelopers, setSelectedDevelopers] = useState(project.users || []);
    const isEditable = ['admin', 'project manager'].includes(currentUser.role);
    const canChangeManager = currentUser.role === 'admin';
    const popupRef = useRef(null);

    useEffect(() => {
        if (currentUser.role === 'admin') {
            fetch('http://localhost:8080/users/getProjectManagers')
            .then(response => response.json())
            .then(setProjectManagers)
            .catch(console.error);
        }

        fetch('http://localhost:8080/users/getDevelopers')
        .then(response => response.json())
        .then(setDevelopers)
        .catch(console.error);

        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose, currentUser.role]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDetails({ ...details, [name]: value });
    };

    const handleDeveloperSelection = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedDevelopers(selectedOptions);
    };

    const handleSubmit = async () => {
        const payload = {
            ...details,
            users: selectedDevelopers,
            projectManager: details.projectManager
        };

        const response = await fetch(`http://localhost:8080/project/updateProject`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            onProjectUpdated();  // Refresh the project list
            onClose();  // Close the popup
        }
    };

    const stopPropagation = (e) => e.stopPropagation();

    return (
        <div className="overlay" onClick={onClose}>
            <div className="project-detail-popup" ref={popupRef} onClick={stopPropagation}>
                <h2>Edit Project</h2>
                <label>Project Name:</label>
                <input type="text" name="name" value={details.name} onChange={handleInputChange} disabled={!isEditable} />
                <label>Project Description:</label>
                <textarea name="description" value={details.description} onChange={handleInputChange} disabled={!isEditable} />
                {canChangeManager && (
                    <label>
                        Project Manager:
                        <select name="projectManager" value={details.projectManager} onChange={handleInputChange}>
                            {projectManagers.map(pm => (
                                <option key={pm.email} value={pm.email}>{pm.email}</option>
                            ))}
                        </select>
                    </label>
                )}
                <label>Users (Developers):</label>
                <select multiple name="users" value={selectedDevelopers} onChange={handleDeveloperSelection} disabled={!isEditable}>
                    {developers.map(dev => (
                        <option key={dev.email} value={dev.email}>{dev.email}</option>
                    ))}
                </select>
                <button onClick={handleSubmit} disabled={!isEditable}>Save Changes</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ProjectDetailsPopup;

