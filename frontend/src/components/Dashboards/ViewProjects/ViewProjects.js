import React, { useState, useEffect } from 'react';
import ProjectCell from './ProjectCell';
import ProjectDetailsPopup from './ProjectDetailsPopup';
import NewProjectForm from './NewProjectForm';
import './Project.css';

const ViewProjects = () => {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showNewProjectForm, setShowNewProjectForm] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        // Ensure currentUser is parsed correctly from localStorage
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    
        const response = await fetch('http://localhost:8080/project/getProjects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role: currentUser.role, email: currentUser.email })
        });
    
        if (response.ok) {
            const data = await response.json();
            setProjects(data);
        } else {
            console.error("Failed to fetch projects");
        }
    };
    

    const handleSelectProject = (project) => {
        if (['admin', 'project manager'].includes(currentUser.role)) {
            setSelectedProject(project);
        }
    };

    const handleClosePopup = () => {
        setSelectedProject(null);
        setShowNewProjectForm(false);
    };

    const toggleNewProjectForm = () => {
        if (['admin', 'project manager'].includes(currentUser.role)) {
            setShowNewProjectForm(!showNewProjectForm);
        }
    };

    return (
        <div className="content-container">
            {['admin', 'project manager'].includes(currentUser.role) && (
                <button onClick={toggleNewProjectForm}>
                    {showNewProjectForm ? "Cancel" : "Create New Project"}
                </button>
            )}
            {showNewProjectForm && (
                <NewProjectForm onProjectCreated={fetchProjects} currentUser={currentUser} onClose={handleClosePopup} />
            )}
            {projects.length > 0 ? (
                projects.map(project => (
                    <ProjectCell key={project.id} project={project} onSelect={handleSelectProject} />
                ))
            ) : (
                <p>No projects available</p>
            )}
            {selectedProject && (
                <ProjectDetailsPopup project={selectedProject} onClose={handleClosePopup} onProjectUpdated={fetchProjects} currentUser={currentUser} />
            )}
        </div>
    );
};

export default ViewProjects;
