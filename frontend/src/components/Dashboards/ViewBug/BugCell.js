import React from 'react';

const BugCell = ({ bug, onSelect }) => {
    return (
        <div className="bug-cell" onClick={() => onSelect(bug)}>
            <h3>{bug.name}</h3>
            <p>{bug.projectName}</p>
        </div>
    );
};

export default BugCell;
