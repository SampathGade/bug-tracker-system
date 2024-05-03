import React, { useState } from 'react';
import './BugComponent.css';

const CreateBugModal = ({ onClose }) => {
    // Example static data for dropdowns
    const projectManagers = ['Manager A', 'Manager B', 'Manager C'];
    const projects = ['Project X', 'Project Y', 'Project Z'];
    const assignees = ['User 1', 'User 2', 'User 3'];
    const types = ['Bug', 'Feature', 'Task'];

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    // Initialize dropdown states with the first item from each list
    const [projectManager, setProjectManager] = useState(projectManagers[0]);
    const [project, setProject] = useState(projects[0]);
    const [assignee, setAssignee] = useState(assignees[0]);
    const [type, setType] = useState(types[0]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/bug/createBug', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name, description, projectManager, project, assignee, type })
        });
        // Mock response for demonstration
        // const response = { status: 200 }; // Mocking a successful login
//        console.log(response)
        if (response.status === 200) {
            onClose();
        } else {
            alert('Error in creating Bugs. Please try again');
        }
    };

    // Handle click outside of modal content to close modal
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="overlay" onClick={handleOverlayClick}>
            <div className="overlay-content" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <h2>Create New Bug</h2>
                    <label>
                        Title:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                    <label>
                        Description:
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </label>
                    <label>
                        Project Manager:
                        <select value={projectManager} onChange={(e) => setProjectManager(e.target.value)}>
                            {projectManagers.map(manager => (
                                <option key={manager} value={manager}>{manager}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Project:
                        <select value={project} onChange={(e) => setProject(e.target.value)}>
                            {projects.map(proj => (
                                <option key={proj} value={proj}>{proj}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Assignee:
                        <select value={assignee} onChange={(e) => setAssignee(e.target.value)}>
                            {assignees.map(user => (
                                <option key={user} value={user}>{user}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Type:
                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            {types.map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </label>
                    <div className="form-actions">
                        <button type="submit">Create Bug</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBugModal;
