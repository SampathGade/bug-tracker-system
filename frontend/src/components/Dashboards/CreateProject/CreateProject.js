import React, { useState, useEffect } from 'react';
import styles from './CreateProject.module.css';

const CreateProject = ({ onProjectUpdated, closeModal, project }) => {
    const [projectName, setProjectName] = useState('');
    const [manager, setManager] = useState('');
    const [details, setDetails] = useState('');

    useEffect(() => {
        if (project) {
            setProjectName(project.projectName);
            setManager(project.manager);
            setDetails(project.details);
        }
    }, [project]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const projectData = { projectName, manager, details };
        onProjectUpdated(projectData, project ? project.id : null);
        closeModal();
    };

    return (
        <div className={styles.container}>
            <button onClick={closeModal} className={styles.closeButton}>&times;</button>
            <h2>{project ? "Edit Project" : "Create Project"}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>Project Name:</label>
                <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} required />
                <label>Manager:</label>
                <input type="text" value={manager} onChange={(e) => setManager(e.target.value)} required />
                <label>Details:</label>
                <textarea value={details} onChange={(e) => setDetails(e.target.value)} />
                <button type="submit" className={styles.button}>{project ? "Update Project" : "Create Project"}</button>
            </form>
        </div>
    );
};

export default CreateProject;
