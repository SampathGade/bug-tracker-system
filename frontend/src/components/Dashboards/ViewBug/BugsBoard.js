import React, { useState, useEffect } from 'react';
import BugCard from './BugCard';
import StatisticsOverlay from './StatisticsOverlay';
import './BugComponent.css';

const BugsBoard = ({ filters, onEditBug }) => {
    const [bugs, setBugs] = useState([]);
    const [showStats, setShowStats] = useState(false);
    const currentSprint = localStorage.getItem("currentSprint") || '1'; // Fetch current sprint, defaulting to 'Backlog' if not set

    useEffect(() => {
        const fetchBugs = async () => {
            try {
                const response = await fetch('http://localhost:8080/bug/getBugsByUserAndSprint', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: localStorage.getItem("userEmail"), 
                        role: localStorage.getItem("userRole"), 
                        project: filters.project, 
                        assignee: filters.assignee,
                        sprint: currentSprint // Add sprint to the API request
                    })
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

        fetchBugs();
    }, [filters, currentSprint]); // Add currentSprint to the dependency array

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
                body: JSON.stringify({ status: newStatus, id: bugId })
            });
            if (!response.ok) {
                console.error('Failed to update bug status');
                // fetchBugs(); // Optionally refetch to sync state
            }
        } catch (error) {
            console.error('Error updating bug status:', error);
        }
    };

    return (
        <div className="bugs-board">
            <button onClick={() => setShowStats(true)} className="view-stats-button">View Statistics</button>
            {showStats && <StatisticsOverlay data={{ bugs }} onClose={() => setShowStats(false)} />}
            {['To Do', 'In Progress', 'Done'].map(status => (
                <div key={status} className="bug-column"
                     onDragOver={(event) => event.preventDefault()}
                     onDrop={(event) => {
                         const bugId = event.dataTransfer.getData("bugId");
                         handleDragEnd(bugId, status);
                     }}>
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
