import React, { useState, useEffect } from 'react';
import ProjectCell from './ProjectCell';
import EditProjectOverlay from './EditProjectOverlay';
import CreateProjectOverlay from './CreateProjectOverlay';
import SearchBar from './SearchBar';
import './ViewProjectsComponent.css';

const ViewProjectsComponent = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [creatingProject, setCreatingProject] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(5);
    const [refreshKey, setRefreshKey] = useState(0);

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
    }, [currentPage, refreshKey]); // Depend on currentPage and refreshKey to refetch when page or refreshKey changes

    const handleSelectProject = (project) => {
        setSelectedProject(project);
        setCreatingProject(false);
    };

    const handleCloseOverlay = () => {
        setSelectedProject(null);
        setCreatingProject(false);
        setCurrentPage(1); // Reset to first page or refresh as needed
        setRefreshKey(oldKey => oldKey + 1); // Change refreshKey to trigger re-render
    };

    const handleOpenCreateProject = () => {
        setCreatingProject(true);
        setSelectedProject(null);
    };

    // Pagination logic
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="projects-container">
            <button onClick={handleOpenCreateProject}>Create Project</button>
            <SearchBar items={projects} onSelectItem={handleSelectProject} />
            <div className='projects-card-list'>
                {currentProjects.map(project => (
                    <ProjectCell key={project.id} project={project} onSelectProject={handleSelectProject} />
                ))}
            </div>
            {selectedProject && (
                <EditProjectOverlay project={selectedProject} onClose={handleCloseOverlay} />
            )}
            {creatingProject && (
                <CreateProjectOverlay onClose={handleCloseOverlay} />
            )}
            <div className="pagination">
                {[...Array(Math.ceil(projects.length / projectsPerPage)).keys()].map(number => (
                    <button key={number + 1} onClick={() => paginate(number + 1)}>
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ViewProjectsComponent;
