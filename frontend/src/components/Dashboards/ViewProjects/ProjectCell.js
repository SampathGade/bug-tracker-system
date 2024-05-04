import React from 'react';
import './ViewProjectsComponent.css'; // Make sure to create appropriate CSS


const ProjectCell = ({ project, onSelectProject }) => {
    return (
        <div className="project-cell" onClick={() => onSelectProject(project)}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
        </div>
    );
};

export default ProjectCell;
