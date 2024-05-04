import React, { useState, useEffect } from 'react';
import ProjectCell from './ProjectCell';
import EditProjectOverlay from './EditProjectOverlay';
import CreateProjectOverlay from './CreateProjectOverlay';
import './ViewProjectsComponent.css'; // Ensure you have this CSS

const ViewProjectsComponent = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [creatingProject, setCreatingProject] = useState(false);

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
    }, []);

    const handleSelectProject = (project) => {
        setSelectedProject(project);
        setCreatingProject(false);
    };

    const handleCloseOverlay = () => {
        setSelectedProject(null);
        setCreatingProject(false);
    };

    const handleOpenCreateProject = () => {
        setCreatingProject(true);
        setSelectedProject(null);
    };

    return (
        <div className="projects-container">
            <button onClick={handleOpenCreateProject}>Create Project</button>
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
    );
};

export default ViewProjectsComponent;
