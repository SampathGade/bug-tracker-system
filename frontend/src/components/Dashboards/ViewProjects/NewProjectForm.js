import React, { useState, useEffect } from 'react';

const NewProjectForm = ({ onProjectCreated, currentUser, onClose }) => {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectManager, setProjectManager] = useState(currentUser.role === 'project manager' ? currentUser.email : '');
    const [projectManagers, setProjectManagers] = useState([]);
    const [developers, setDevelopers] = useState([]);
    const [selectedDevelopers, setSelectedDevelopers] = useState([]);

    useEffect(() => {
        if (currentUser.role === 'admin') {
            fetch('http://localhost:8080/users/getProjectManagers')
            .then(response => response.json())
            .then(data => {
                setProjectManagers(data);
                if (!projectManager) setProjectManager(data[0]?.email || ''); // Set default if empty
            })
            .catch(console.error);
        }

        fetch('http://localhost:8080/users/getDevelopers')
        .then(response => response.json())
        .then(setDevelopers)
        .catch(console.error);
    }, [currentUser.role, projectManager]);

    const handleDeveloperSelection = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedDevelopers(selectedOptions);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            name: projectName,
            description: projectDescription,
            projectManager,
            users: selectedDevelopers.map(developer => developer.toString())
        };

        const response = await fetch('http://localhost:8080/project/createProject', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            onProjectCreated();
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="new-project-form">
            <label>
                Project Name:
                <input type="text" value={projectName} onChange={e => setProjectName(e.target.value)} />
            </label>
            <label>
                Project Description:
                <textarea value={projectDescription} onChange={e => setProjectDescription(e.target.value)} />
            </label>
            {currentUser.role === 'admin' && (
                <label>
                    Project Manager:
                    <select value={projectManager} onChange={e => setProjectManager(e.target.value)}>
                        {projectManagers.map(pm => (
                            <option key={pm.email} value={pm.email}>{pm.email}</option>
                        ))}
                    </select>
                </label>
            )}
            <label>
                Users:
                <select multiple value={selectedDevelopers} onChange={handleDeveloperSelection}>
                    {developers.map(dev => (
                        <option key={dev.email} value={dev.email}>{dev.email}</option>
))}
                </select>
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default NewProjectForm;
