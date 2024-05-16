import React from "react";

const EditUserOverlay = ({
  user,
  managers,
  handleSubmit,
  handleOverlayClick,
  role,
  setRole,
  projectManager,
  setManager,
}) => {
  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit User</h2>
        <p>Email: {user.email}</p>
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Developer">Developer</option>
            <option value="Tester">Tester</option>
            <option value="projectManager">Project Manager</option>
            <option value="External User">External User</option>
          </select>
        </label>
        <label>
          Project Manager:
          <select
            value={projectManager}
            onChange={(e) => setManager(e.target.value)}>
            {managers.map((manager) => (
              <option key={manager.email} value={manager.email}>
                {manager.email}
              </option>
            ))}
          </select>
        </label>
        <button onClick={() => handleSubmit("accepted")}>Accept</button>
        <button onClick={() => handleSubmit("rejected")}>Reject</button>
      </div>
    </div>
  );
};

export default EditUserOverlay;
