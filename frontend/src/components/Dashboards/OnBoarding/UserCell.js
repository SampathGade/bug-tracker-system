import React from 'react';

const UserCell = ({ user, onSelectUser }) => {
    return (
        <div className="user-cell" onClick={() => onSelectUser(user)}>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
        </div>
    );
};

export default UserCell;
