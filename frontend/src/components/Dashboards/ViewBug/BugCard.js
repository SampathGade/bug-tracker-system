import React from "react";
import "./BugComponent.css";
import { Card } from "@mui/material";

const BugCard = ({ bug, onEdit }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("bugId", bug.id);
  };

  return (
    <Card
      className="bug-card"
      draggable="true"
      onDragStart={handleDragStart}
      onClick={onEdit}>
      <div>
        <h3>{bug.name}</h3>
        <p>Status: {bug.status}</p>
      </div>
    </Card>
  );
};

export default BugCard;
