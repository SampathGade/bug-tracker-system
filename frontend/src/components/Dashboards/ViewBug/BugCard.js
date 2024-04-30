import React from 'react';
import './BugComponent.css'


const BugCard = ({ bug, onEdit }) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData("bugId", bug.id);
    };

    return (
        <div className="bug-card" draggable="true"
             onDragStart={handleDragStart} onClick={onEdit}>
            <h3>{bug.title}</h3>
            <p>Status: {bug.status}</p>
        </div>
    );
};

export default BugCard;
