import React, { useState, useEffect } from 'react';
import './BugComponent.css';

const FiltersPanel = ({ filters, onFilterChange, projects }) => {
    const [assignees, setAssignees] = useState([]);

    useEffect(() => {
        const fetchAssignees = async () => {
            try {
                const response = await fetch('http://localhost:8080/users/getDevelopersByProject', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: filters.project
                });
                if (response.ok) {
                    const assigneesData = await response.json();
                    setAssignees(assigneesData);
                } else {
                    console.error('Failed to fetch assignees');
                }
            } catch (error) {
                console.error('Error fetching assignees:', error);
            }
        };

        if (filters.project) {
            fetchAssignees();
        }
    }, [filters.project]); // Dependency on project filter to re-fetch assignees

    const handleProjectChange = (e) => {
        onFilterChange({ ...filters, project: e.target.value });
    };

    const handleAssigneeChange = (assigneeEmail, isChecked) => {
        const newAssignees = isChecked
            ? [...filters.assignee, assigneeEmail]
            : filters.assignee.filter(a => a !== assigneeEmail);
        onFilterChange({ ...filters, assignee: newAssignees });
    };

    const getInitials = (email) => email.substr(0, 2).toUpperCase();

    return (
        <div className="filters-panel">
            <select className='select-filter' onChange={handleProjectChange} value={filters.project}>
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
