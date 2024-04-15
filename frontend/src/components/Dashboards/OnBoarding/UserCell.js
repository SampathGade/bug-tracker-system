// UserCell.js
import React from 'react';
import './PendingRequests.css';


const UserCell = ({ user, onSelect }) => {
    return (
        <div className="user-cell" onClick={(e) => {
            e.stopPropagation();
            onSelect(user);
        }}>
            <div>Email: {user.email}</div>
            <div>Role: {user.role}</div>
        </div>
    );
};

export default UserCell;
