import React, { useState } from 'react';

const EditProjectOverlay = ({ project, onClose }) => {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [projectManager, setProjectManager] = useState(project.projectManager);
    const [developers, setDevelopers] = useState(project.developers || []);

    // Static data for Project Managers and potential developers
    const managers = ['Manager A', 'Manager B', 'Manager C'];
    const allDevelopers = ['Dev A', 'Dev B', 'Dev C', 'Dev D']; // Example developer list

    const handleUpdateProject = async () => {
        const updatedDetails = { id: project.id, name, description, projectManager, developers };
        const response = await fetch(`http://localhost:8080/project/updateProject`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedDetails)
        });
        if (response.ok) {
            onClose(); // Close the overlay and potentially refresh the list
        }
    };

    const handleAddDeveloper = (developer) => {
        if (!developers.includes(developer)) {
            setDevelopers([...developers, developer]);
        }
    };

    const handleRemoveDeveloper = (developer) => {
        setDevelopers(developers.filter(dev => dev !== developer));
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
                            <select value={projectManager} onChange={e => setProjectManager(e.target.value)}>
                                {managers.map(m => <option key={m} value={m}>{m}</option>)}
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
                        <div>
                            <select onChange={e => handleAddDeveloper(e.target.value)}>
                                <option value="">Add Developer</option>
                                {allDevelopers.filter(dev => !developers.includes(dev)).map(dev => (
                                    <option key={dev} value={dev}>{dev}</option>
                                ))}
                            </select>
                        </div>
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
