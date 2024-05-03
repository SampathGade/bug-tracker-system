import React, { useState, useEffect } from 'react';
import UserCell from './UserCell';
import EditUserOverlay from './EditUserOverlay';
import './OnboardingComponent.css'; // Import CSS

const OnboardingComponent = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [refresh, setRefresh] = useState(false); // To trigger re-fetching

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:8080/auth/pending');
            if (response.ok) {
                const data = await response.json();
                setUsers(data.length > 0 ? data : null);
            }
        };

        fetchUsers();
    }, [refresh]); // Refresh dependency to re-fetch when needed

    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    const handleCloseOverlay = () => {
        setSelectedUser(null);
    };

    const triggerRefresh = () => { // Function to update refresh state
        setRefresh(!refresh);
    };

    return (
        <div className="onboarding-container">
            {users ? users.map(user => (
                <UserCell key={user.email} user={user} onSelectUser={handleSelectUser} />
            )) : <p>No Pending Requests</p>}
            {selectedUser && <EditUserOverlay user={selectedUser} onClose={handleCloseOverlay} onStatusChange={triggerRefresh} />}
        </div>
    );
};

export default OnboardingComponent;
