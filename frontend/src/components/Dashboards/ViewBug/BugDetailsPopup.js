import React from 'react';

const BugDetails = ({ bug, onClose }) => {
  return (
    <div className="overlay">
      <div>
        <h2>{bug.title}</h2>
        <p>{bug.description}</p>
        <p>Assignee: {bug.assignee || "No assignee"}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BugDetails;
