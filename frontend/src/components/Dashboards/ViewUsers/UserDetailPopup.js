import React, { useState, useEffect } from 'react';
import '../OnBoarding/PendingRequests.css';

const UserDetailPopup = ({ user, onClose, onReload }) => {
  const [role, setRole] = useState(user.role);
  const [projectManager, setProjectManager] = useState(user.projectManager || '');
  const [projectManagers, setProjectManagers] = useState([]);

  useEffect(() => {
    const fetchProjectManagers = async () => {
      const response = await fetch('http://localhost:8080/users/getProjectManagers');
      if (response.ok) {
        const data = await response.json();
        setProjectManagers(data);
      } else {
        console.error("Failed to fetch project managers");
      }
    };

    fetchProjectManagers();
  }, []);

  const handleUpdate = async () => {
    const payload = {
      email: user.email,
      role: role,
      projectManager: projectManager || null  // Send null if no project manager is selected
    };

    const response = await fetch(`http://localhost:8080/users/updateDetails`, {
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

  const handleChangeProjectManager = (e) => {
    setProjectManager(e.target.value);
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
      <div>
        <label>Project Manager:</label>
        <select value={projectManager} onChange={handleChangeProjectManager}>
          <option value="">None</option>  {/* Option to have no project manager */}
          {projectManagers.map(pm => (
            <option key={pm.email} value={pm.email}>{pm.email}</option>
          ))}
        </select>
      </div>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UserDetailPopup;
