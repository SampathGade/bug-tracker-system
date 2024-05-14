import React, { useState, useEffect } from 'react';

const CreateProjectOverlay = ({ onClose }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [projectManager, setProjectManager] = useState('');
    const [developers, setDevelopers] = useState([]);
    const [managers, setManagers] = useState([]);
    const [allDevelopers, setAllDevelopers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const managersResponse = await fetch('http://localhost:8080/users/getProjectManagers');
            const developersResponse = await fetch('http://localhost:8080/users/getDevelopers');
            const managersData = await managersResponse.json();
            const developersData = await developersResponse.json();
            setManagers(managersData);
            setAllDevelopers(developersData);
        };
        fetchData();
    }, []);

    const handleCreateProject = async () => {
        const newProjectDetails = { name, description, projectManager, developers };
        const response = await fetch('http://localhost:8080/project/createProject', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProjectDetails)
        });
        if (response.ok) {
            onClose(); // Close the overlay and potentially refresh the project list
        } else {
            console.error('Failed to create project'); // Handle errors appropriately
        }
    };

    const handleAddDeveloper = (event) => {
        const selectedDeveloper = event.target.value;
        if (selectedDeveloper && !developers.includes(selectedDeveloper)) {
            setDevelopers([...developers, selectedDeveloper]);
        }
    };

    const handleRemoveDeveloper = (developerEmail) => {
        setDevelopers(developers.filter(dev => dev !== developerEmail));
    };

    return (
        <div className="overlay" onClick={onClose}>
            <div className="overlay-content" onClick={e => e.stopPropagation()}>
                <h2>Create New Project</h2>
                <label>
                    Project Name:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    Description:
                    <textarea value={description} onChange={e => setDescription(e.target.value)} />
                </label>
                <label>
                    Project Manager:
                    <select value={projectManager} onChange={e => setProjectManager(e.target.value)}>
                        <option value="" disabled>Select a manager</option>
                        {managers.map(m => (
                            <option key={m.id} value={m.email}>{m.email}</option>
                        ))}
                    </select>
                </label>
                <label>Developers:</label>
                {developers.map(dev => (
                    <div key={dev} className="developer-cell">
                        {dev}
                        <button onClick={() => handleRemoveDeveloper(dev)}>Remove</button>
                    </div>
                ))}
                <select onChange={handleAddDeveloper} defaultValue="">
                    <option value="" disabled>Select a developer to add</option>
                    {allDevelopers.map(dev => (
                        <option key={dev.id} value={dev.email}>{dev.email}</option>
                    ))}
                </select>
                <div className='form-actions'>
                    <button onClick={handleCreateProject}>Create</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CreateProjectOverlay;
