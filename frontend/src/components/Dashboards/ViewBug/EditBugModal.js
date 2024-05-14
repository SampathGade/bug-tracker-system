import React, { useState, useEffect } from 'react';

const EditProjectOverlay = ({ project, onClose }) => {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [projectManager, setProjectManager] = useState(project.projectManager || '');
    const [developers, setDevelopers] = useState(project.developers || []);
    const [managers, setManagers] = useState([]);
    const [allDevelopers, setAllDevelopers] = useState([]);
    const [filteredManagers, setFilteredManagers] = useState([]);
    const [filteredDevelopers, setFilteredDevelopers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const managersResponse = await fetch('http://localhost:8080/users/getProjectManagers');
            const developersResponse = await fetch('http://localhost:8080/users/getDevelopers');
            const managersData = await managersResponse.json();
            const developersData = await developersResponse.json();
            setManagers(managersData);
            setAllDevelopers(developersData);
            setFilteredManagers(managersData);
            setFilteredDevelopers(developersData);
            setProjectManager(project.projectManager);
        };
        fetchData();
    }, [project.projectManager]);

    const handleUpdateProject = async () => {
        const updatedDetails = {
            id: project.id,
            name,
            description,
            projectManager,
            developers
        };
        const response = await fetch(`http://localhost:8080/project/updateProject`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedDetails)
        });
        if (response.ok) {
            onClose();
        }
    };

    const handleAddDeveloper = (developerEmail) => {
        if (!developers.includes(developerEmail)) {
            setDevelopers([...developers, developerEmail]);
        }
    };

    const handleRemoveDeveloper = (developerEmail) => {
        setDevelopers(developers.filter(dev => dev !== developerEmail));
    };

    const filterManagers = (input) => {
        setProjectManager(input);
        setFilteredManagers(managers.filter(m => m.email.toLowerCase().includes(input.toLowerCase())));
    };

    const filterDevelopers = (input) => {
        setFilteredDevelopers(allDevelopers.filter(dev => dev.email.toLowerCase().includes(input.toLowerCase())));
    };

    return (
        <div className="overlay" onClick={() => onClose()}>
            <div className="overlay-content" onClick={e => e.stopPropagation()}>
                <h2>Edit Project</h2>
                <div className="edit-form">
                    <div>
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
                            <input 
                                type="text" 
                                value={projectManager}
                                onChange={e => filterManagers(e.target.value)}
                            />
                            <select 
                                value={projectManager} 
                                onChange={e => setProjectManager(e.target.value)}>
                                {filteredManagers.map(m => <option key={m.id} value={m.email}>{m.email}</option>)}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>Developers:</label>
                        {developers.map(dev => (
                            <div key={dev} className="developer-cell">
                                {dev}
                                <button onClick={() => handleRemoveDeveloper(dev)}>Remove</button>
                            </div>
                        ))}
                        <input 
                            type="text"
                            onChange={e => filterDevelopers(e.target.value)}
                        />
                        <select multiple onChange={e => handleAddDeveloper(e.target.value)}>
                            {filteredDevelopers.map(dev => (
                                <option key={dev.id} value={dev.email}>{dev.email}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='form-actions'>
                    <button onClick={handleUpdateProject}>Update</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditProjectOverlay;
