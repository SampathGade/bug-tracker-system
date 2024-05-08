import React, { useState, useEffect } from 'react';
import ProjectCell from './ProjectCell';
import EditProjectOverlay from './EditProjectOverlay';
import CreateProjectOverlay from './CreateProjectOverlay';
import './ViewProjectsComponent.css'; // Ensure you have this CSS

const ViewProjectsComponent = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [creatingProject, setCreatingProject] = useState(false);
    const [refreshProjects, setRefreshProjects] = useState(false);


    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        const role = localStorage.getItem('userRole');

        const fetchProjects = async () => {
            const response = await fetch('http://localhost:8080/project/getProjects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, role })
            });
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            } else {
                console.error('Failed to fetch projects');
            }
        };
        fetchProjects();
    }, [refreshProjects]);


    const handleSelectProject = (project) => {
        setSelectedProject(project);
        setCreatingProject(false);
    };

    const handleCloseOverlay = () => {
        setSelectedProject(null);
        setCreatingProject(false);
        setRefreshProjects(prev => !prev); // Toggle to trigger useEffect
    };

    const handleOpenCreateProject = () => {
        setCreatingProject(true);
        setSelectedProject(null);
    };

    return (
        <div className="projects-container">
            <div>
            <button onClick={handleOpenCreateProject}>Create Project</button></div>
            <div className='projects-card-list'>
            {projects.map(project => (
                <ProjectCell key={project.id} project={project} onSelectProject={handleSelectProject} />
            ))}
            {selectedProject && (
                <EditProjectOverlay project={selectedProject} onClose={handleCloseOverlay} />
            )}
            {creatingProject && (
                <CreateProjectOverlay onClose={handleCloseOverlay} />
            )}
            </div>
        </div>
    );
};

export default ViewProjectsComponent;
