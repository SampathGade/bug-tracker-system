import React, { useState } from 'react';
import BugCard from './BugCard';
import './BugComponent.css'


const BugsBoard = ({ filters, onEditBug }) => {
    const [bugs, setBugs] = useState([
        { id: '1', title: 'Bug 1', status: 'To Do' },
        { id: '2', title: 'Bug 2', status: 'In Progress' },
        { id: '3', title: 'Bug 3', status: 'Done' },
    ]);

    const handleDragEnd = (bugId, newStatus) => {
        const updatedBugs = bugs.map(bug => {
            if (bug.id === bugId) {
                return { ...bug, status: newStatus };
            }
            return bug;
        });
        setBugs(updatedBugs);
        // Here you would also make an API call to update the bug status in the backend
    };

    const getStatusFilteredBugs = (status) => bugs.filter(bug => bug.status === status);

    return (
        <div className="bugs-board">
            {['To Do', 'In Progress', 'Done'].map(status => (
                <div key={status} className="bug-column"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDragEnd(e.dataTransfer.getData("bugId"), status)}>
                    <h2>{status}</h2>
                    {getStatusFilteredBugs(status).map(bug => 
                        <BugCard key={bug.id} bug={bug} onEdit={() => onEditBug(bug)} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default BugsBoard;
