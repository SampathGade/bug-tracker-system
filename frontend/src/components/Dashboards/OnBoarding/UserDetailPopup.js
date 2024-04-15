import React, { useState } from 'react';
import './PendingRequests.css';

const UserDetailPopup = ({ user, onClose, onReload }) => {
  const [role, setRole] = useState(user.role);

  const handleAccept = async () => {
    // Prepare the payload
    const payload = {
      email: user.email,
      role: role,
      status: 'accept'
    };

    // Send a POST request
    const response = await fetch(`http://localhost:8080/auth/updateStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      onReload();  // Trigger reload in parent component
    }
    onClose();
  };

  const handleReject = async () => {
    // Prepare the payload
    const payload = {
      email: user.email,
      role: role,
      status: 'reject'
    };

    // Send a POST request
    const response = await fetch(`http://localhost:8080/auth/updateStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      onReload();  // Trigger reload in parent component
    }
    onClose();
  };

  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="user-detail-popup" onClick={stopPropagation}>
      <div>
        <label>Email:</label>
        <input type="email" value={user.email} readOnly />
      </div>
      <div>
        <label>Role:</label>
        <select value={role} onChange={handleChangeRole}>
          <option value="developer">Developer</option>
          <option value="admin">Admin</option>
          <option value="qa">QA</option>
          <option value="project manager">Project Manager</option>
          <option value="external person">External Person</option>
        </select>
      </div>
      <button onClick={handleAccept}>Accept</button>
      <button onClick={handleReject}>Reject</button>
    </div>
  );
};

export default UserDetailPopup;
