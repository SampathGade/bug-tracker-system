import React, { useState, useEffect } from 'react';
import BugCell from './BugCell';
import BugDetailsPopup from './BugDetailsPopup';
import CreateBugForm from './CreateBugForm';
import './Project.css';  // Make sure this CSS is correctly linked

const ViewBugs = () => {
    const [bugs, setBugs] = useState([]);
    const [selectedBug, setSelectedBug] = useState(null);
    const [showCreateBugForm, setShowCreateBugForm] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setCurrentUser(user);
            fetchBugs(user);
        } else {
            // Ideally, redirect to login or show an appropriate message/error
            console.log("User not found. Redirecting to login.");
        }
    }, []);

    const fetchBugs = async (user) => {
        const response = await fetch('http://localhost:8080/bug/getBugsByUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: user.role, email: user.email })
        });
        if (response.ok) {
            const data = await response.json();
            setBugs(data);
        } else {
            console.error("Failed to fetch bugs");
        }
    };

    const handleSelectBug = (bug) => {
        setSelectedBug(bug);
    };

    const toggleCreateBugForm = () => {
        setShowCreateBugForm(!showCreateBugForm);
    };

    const handleClose = () => {
        setSelectedBug(null); // Assuming this might also close bug details popup
        setShowCreateBugForm(false); // Close the create bug form
    };

    return (
        <div className="content-container">
            {['admin', 'project manager'].includes(currentUser.role) && (
                <button onClick={toggleCreateBugForm}>
                    {showCreateBugForm ? "Cancel" : "Create New Bug"}
                </button>
            )}
            {showCreateBugForm && (
                <CreateBugForm onBugCreated={() => fetchBugs(currentUser)} currentUser={currentUser} onClose={handleClose} />
            )}
            {bugs.length > 0 ? (
                bugs.map(bug => (
                    <BugCell key={bug.id} bug={bug} onSelect={handleSelectBug} />
                ))
            ) : (
                <p>No bugs available</p>
            )}
            {selectedBug && (
                <BugDetailsPopup bug={selectedBug} onClose={handleClose} onBugUpdated={() => fetchBugs(currentUser)} currentUser={currentUser} />
            )}
        </div>
    );
};

export default ViewBugs;
