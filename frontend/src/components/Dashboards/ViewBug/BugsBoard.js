import React, { useState, useEffect } from 'react';
import BugCard from './BugCard';
import './BugComponent.css';

const BugsBoard = ({ filters, onEditBug }) => {
    const [bugs, setBugs] = useState([]);
    const role = localStorage.getItem("userRole");
    const email = localStorage.getItem("userEmail");

    useEffect(() => {
        fetchBugs();
    }, [filters]); // Re-run when filters change

    const fetchBugs = async () => {
        try {
            const response = await fetch('http://localhost:8080/bug/getBugsByUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, role, project: filters.project, assignee: filters.assignee })
            });
            if (response.ok) {
                const fetchedBugs = await response.json();
                setBugs(fetchedBugs);
            } else {
                console.error('Failed to fetch bugs');
            }
        } catch (error) {
            console.error('Error fetching bugs:', error);
        }
    };

    const handleDragEnd = async (bugId, newStatus) => {
        const updatedBugs = bugs.map(bug => {
            if (bug.id === bugId) {
                return { ...bug, status: newStatus };
            }
            return bug;
        });
        setBugs(updatedBugs);

        try {
            const response = await fetch(`http://localhost:8080/bug/updateBugStatus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status : newStatus, id : bugId })
            });
            if (!response.ok) {
                console.error('Failed to update bug status');
                fetchBugs(); // Optionally refetch to sync state
            }
        } catch (error) {
            console.error('Error updating bug status:', error);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Necessary to allow the drop
    };

    const handleDrop = (event, newStatus) => {
        const bugId = event.dataTransfer.getData("bugId");
        handleDragEnd(bugId, newStatus);
    };

    return (
        <div className="bugs-board">
            {['To Do', 'In Progress', 'Done'].map(status => (
                <div key={status} className="bug-column"
                     onDragOver={handleDragOver}
                     onDrop={(e) => handleDrop(e, status)}>
                    <h2>{status}</h2>
                    {bugs.filter(bug => bug.status === status).map(bug => (
                        <BugCard key={bug.id} bug={bug} onEdit={() => onEditBug(bug)} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default BugsBoard;
