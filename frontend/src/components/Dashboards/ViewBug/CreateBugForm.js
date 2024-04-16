import React, { useState, useEffect } from 'react';
import './Project.css'; // Ensure this CSS is properly linked and contains the required styles

const CreateBugForm = ({ onBugCreated, currentUser, onClose }) => {
    const [bugName, setBugName] = useState('');
    const [projectName, setProjectName] = useState('');
    const [bugType, setBugType] = useState('');
    const [assignee, setAssignee] = useState('');
    const [projects, setProjects] = useState([]);
    const [developers, setDevelopers] = useState([]);

    useEffect(() => {
        // Fetch projects
        fetch('http://localhost:8080/project/getProjects', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: currentUser.role, email: currentUser.email })
        })
            .then(response => response.json())
            .then(data => {
                setProjects(data);
                if (data.length > 0) {
                    setProjectName(data[0].name); // Default to first project
                    setBugType(data[0].bugTypes[0]); // Default to first bug type
                }
            })
            .catch(console.error);

        // Fetch developers if the user is admin or project manager
        if (['admin', 'project manager'].includes(currentUser.role)) {
            fetch('http://localhost:8080/users/getDevelopers', { method: 'GET' })
                .then(response => response.json())
                .then(setDevelopers)
                .catch(console.error);
        }
    }, [currentUser.role]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            name: bugName,
            projectName,
            bugType,
            assignee
        };

        const response = await fetch('http://localhost:8080/bug/createBug', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            onBugCreated();
            onClose(); // Optionally close the form
        }
    };

    return (
        <form onSubmit={handleSubmit} className="new-bug-form">
            <label>
                Bug Name:
                <input type="text" value={bugName} onChange={e => setBugName(e.target.value)} />
            </label>
            <label>
                Project Name:
                <select value={projectName} onChange={e => setProjectName(e.target.value)}>
                    {projects.map(project => (
                        <option key={project.name} value={project.name}>{project.name}</option>
                    ))}
                </select>
            </label>
            <label>
                Bug Type:
                <select value={bugType} onChange={e => setBugType(e.target.value)}>
                    {projects.find(p => p.name === projectName)?.bugTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </label>
            {['admin', 'project manager'].includes(currentUser.role) && (
                <label>
                    Assignee:
                    <select value={assignee} onChange={e => setAssignee(e.target.value)}>
                        {developers.map(dev => (
                            <option key={dev.email} value={dev.email}>{dev.email}</option>
                        ))}
                    </select>
                </label>
            )}
            <button type="submit">Create Bug</button>
        </form>
    );
};

export default CreateBugForm;
