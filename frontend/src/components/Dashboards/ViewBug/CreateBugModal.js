import React, { useState, useEffect } from 'react';
import './BugComponent.css';

const CreateBugModal = ({ onClose }) => {
    const [projects, setProjects] = useState([]);
    const [projectManagers, setProjectManagers] = useState([]);
    const [assignees, setAssignees] = useState([]);
    const [types, setTypes] = useState(['Bug', 'Feature', 'Task']);
    const [selectedProject, setSelectedProject] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [projectManager, setProjectManager] = useState('');
    const [expectedOutcome, setExpectedOutcome] = useState('');
    const [assignee, setAssignee] = useState('');
    const [type, setType] = useState(types[0]);
    const userRole = localStorage.getItem("userRole");
    const userEmail = localStorage.getItem("userEmail");

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch('http://localhost:8080/project/getProjects', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email: userEmail, role: userRole })
            });
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
                if (data.length > 0) {
                    setSelectedProject(data[0].name);
                    setProjectManager(data[0].projectManager);
                }
            }
        };
            fetchProjects();
    }, [userEmail, userRole]);

    useEffect(() => {
        if (selectedProject) {
            const project = projects.find(p => p.name === selectedProject);
            if (project) {
                setProjectManager(project.projectManager);

                const fetchAssignees = async () => {
                    const response = await fetch('http://localhost:8080/users/getDevelopersByProject', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: project.name
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setAssignees(data);
                        if (data.length > 0) {
                            setAssignee(data[0]);
                        }
                    }
                };

                fetchAssignees();
            }
        }
    }, [selectedProject, projects]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/bug/createBug', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name, description, projectManager, project: selectedProject, assignee, type })
        });
        if (response.ok) {
            onClose();
        } else {
            alert('Error in creating Bugs. Please try again');
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
                                Project:
                                <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
                                    {projects.map(proj => (
                                        <option key={proj.name} value={proj.name}>{proj.name}</option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                Project Manager:
                                <input type="text" value={projectManager} readOnly />
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
                    <label>
                        Expected Outcome:
                        <textarea value={expectedOutcome} onChange={(e) => setExpectedOutcome(e.target.value)} required />
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
