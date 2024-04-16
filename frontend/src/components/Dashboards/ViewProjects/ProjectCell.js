// src/components/Projects/ProjectCell.js

import React from 'react';
import './Project.css';

const ProjectCell = ({ project, onSelect }) => {
    return (
        <div className="project-cell" onClick={(e) => {
            e.stopPropagation();
            onSelect(project);
        }}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
        </div>
    );
};

export default ProjectCell;
