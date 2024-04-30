import React from 'react';
import './BugComponent.css'

const FiltersPanel = ({ filters, onFilterChange }) => {
    const projects = ['Project A', 'Project B', 'Project C']; // Example projects
    const assignees = ['User 1', 'User 2', 'User 3', 'User 4']; // Example assignees

    const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();

    const handleProjectChange = (e) => {
        onFilterChange({ ...filters, project: e.target.value });
    };

    const handleAssigneeChange = (assignee, isChecked) => {
        const newAssignees = isChecked
            ? [...filters.assignee, assignee]
            : filters.assignee.filter(a => a !== assignee);
        onFilterChange({ ...filters, assignee: newAssignees });
    };

    return (
        <div className="filters-panel">
            <select onChange={handleProjectChange} value={filters.project}>
                {projects.map(project => (
                    <option key={project} value={project}>{project}</option>
                ))}
            </select>
            <div className="assignee-icons">
                {assignees.map(assignee => (
                    <div key={assignee} className="assignee-icon">
                        <input
                            type="checkbox"
                            id={`assignee-${assignee}`}
                            checked={filters.assignee.includes(assignee)}
                            onChange={(e) => handleAssigneeChange(assignee, e.target.checked)}
                            hidden
                        />
                        <label htmlFor={`assignee-${assignee}`}>
                            <div className="icon-label">{getInitials(assignee)}</div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FiltersPanel;
