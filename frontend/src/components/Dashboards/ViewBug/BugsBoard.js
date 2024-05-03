import React, { useState, useEffect } from 'react';
import BugCard from './BugCard';
import './BugComponent.css';

const BugsBoard = ({ filters, onEditBug }) => {
    const [bugs, setBugs] = useState([]);
    const role = localStorage.getItem("userRole");
    const email = localStorage.getItem("userEmail");

    // Fetch bugs from the API when the component mounts or filters change
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
                body: JSON.stringify({email: email,role : role}) // Send filters as POST body
            });
            if (response.ok) {
                const fetchedBugs = await response.json();
                setBugs(fetchedBugs);
            } else {
                // Handle errors, possibly set an error state and show it in UI
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

        // Make an API call to update the bug status in the backend
        try {
            const response = await fetch(`/api/bugs/${bugId}/status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newStatus }) // Send the new status as POST body
            });
            if (!response.ok) {
                // If the update fails, revert to the old state or handle errors
                console.error('Failed to update bug status');
                fetchBugs(); // Optional: refetch bugs to sync with backend state
            }
        } catch (error) {
            console.error('Error updating bug status:', error);
        }
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
