import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ImageUploader from './ImageUploader'; // Ensure this handles multiple uploads and returns URLs
import './BugComponent.css';

const CreateBugModal = ({ onClose }) => {
    const [projects, setProjects] = useState([]);
    const [assignees, setAssignees] = useState([]);
    const [types, setTypes] = useState(['Bug', 'Feature', 'Task']);
    const [selectedProject, setSelectedProject] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [projectManager, setProjectManager] = useState('');
    const [expectedOutcome, setExpectedOutcome] = useState({ text: '', images: [] });
    const [actualOutcome, setActualOutcome] = useState({ text: '', images: [] });
    const [assignee, setAssignee] = useState('');
    const [type, setType] = useState(types[0]);
    const [sprint, setSprint] = useState(localStorage.getItem('currentSprint') || '1');
    const [storyPoints, setStoryPoints] = useState('');
    const [slaDate, setSlaDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const userRole = localStorage.getItem("userRole");
    const userEmail = localStorage.getItem("userEmail");
    const userId = localStorage.getItem("userId");

    const today = new Date().toISOString().split('T')[0]; // format today's date as YYYY-MM-DD

    const sprintOptions = Array.from({ length: 27 }, (_, i) => ({ value: i + 1, label: `Sprint ${i + 1}` }))
        .concat({ value: 'Backlog', label: 'Backlog' });

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
                    const response = await fetch(`http://localhost:8080/users/getDevelopersByProject`, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: selectedProject
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setAssignees(data);
                    }
                };

                fetchAssignees();
            }
        }
    }, [selectedProject, projects]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setIsLoading(true);
    
        const bugData = {
            bug: {
                name,
                description,
                project: selectedProject,
                projectManager,
                assignee,
                type,
                sprint,
                storyPoints,
                expectedOutcome,
                actualOutcome,
                slaDate
            },
            userDetails: {
                email: userEmail,
                id: userId
            }
        };
    
        const response = await fetch('http://localhost:8080/bug/createBug', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bugData)
        });
    
        if (response.ok) {
            onClose(); // Close the modal
        } else {
            const errorData = await response.json();
            alert(`Error in creating bug: ${errorData.message || 'Please try again'}.`);
        }
    
        setIsLoading(false);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleExpectedImageUpload = (urls) => {
        setExpectedOutcome({ ...expectedOutcome, images: urls });
        setIsUploading(false);
    };

    const handleExpectedImageUploadStart = () => {
        setIsUploading(true);
    };

    const handleActualImageUpload = (urls) => {
        setActualOutcome({ ...actualOutcome, images: urls });
        setIsUploading(false);
    };

    const handleActualImageUploadStart = () => {
        setIsUploading(true);
    };

    const handleAssigneeChange = (newValue) => {
        setAssignee(newValue ? newValue.value : '');
    };

    const assigneeOptions = [{ value: 'Auto', label: 'Auto Assign' }].concat(
        assignees.map(user => ({ value: user, label: user }))
    );

    const handleSlaDateChange = (e) => {
        setSlaDate(e.target.value);
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
                        <Select
                            options={assigneeOptions}
                            onChange={handleAssigneeChange}
                            placeholder="Select or type an assignee"
                            isClearable
                            value={assignee ? { value: assignee, label: assignee } : null}
                        />
                    </label>
                    <label>
                        Sprint:
                        <Select
                            options={sprintOptions}
                            onChange={option => setSprint(option.value)}
                            placeholder="Select or type a sprint"
                            isSearchable
                            value={sprintOptions.find(option => option.value === sprint)}
                        />
                    </label>
                    <label>
                        Story Points:
                        <input type="number" value={storyPoints} onChange={(e) => setStoryPoints(e.target.value)} required />
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
                        <textarea value={expectedOutcome.text} onChange={(e) => setExpectedOutcome({ ...expectedOutcome, text: e.target.value })} required />
                        <ImageUploader onUpload={handleExpectedImageUpload} onUploadStart={handleExpectedImageUploadStart} />
                    </label>
                    <label>
                        Actual Outcome:
                        <textarea value={actualOutcome.text} onChange={(e) => setActualOutcome({ ...actualOutcome, text: e.target.value })} required />
                        <ImageUploader onUpload={handleActualImageUpload} onUploadStart={handleActualImageUploadStart} />
                    </label>
                    <label>
                        SLA Date:
                        <input type="date" value={slaDate} onChange={handleSlaDateChange} min={today} required />
                    </label>
                    <div className="form-actions">
                        <button type="submit" disabled={isLoading || isUploading}>
                            {isLoading ? 'Creating Bug...' : 'Create Bug'}
                        </button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBugModal;
