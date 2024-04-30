import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CreateBugForm from './CreateBugForm';
import BugDetails from './BugDetailsPopup';

const initialBugs = {
  todo: [{ id: 'bug-1', title: 'Login Page Error', assignee: 'Alice' }],
  inProgress: [{ id: 'bug-3', title: 'API Load Issues', assignee: 'Bob' }],
  done: [{ id: 'bug-4', title: 'Header Alignment Fixed', assignee: '' }]
};

const BugComponent = () => {
  const [bugs, setBugs] = useState(initialBugs);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedBug, setSelectedBug] = useState(null);

  const handleCreateBug = (bug) => {
    const newBug = { ...bug, id: `bug-${Date.now()}`, status: 'todo' };
    setBugs({ ...bugs, todo: [...bugs.todo, newBug] });
    setShowCreateForm(false);
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
  };

  const handleBugClick = (bug) => {
    setSelectedBug(bug);
  };

  const handleBugClose = () => {
    setSelectedBug(null);
  };

  return (
    <div>
      {showCreateForm && <CreateBugForm onSave={handleCreateBug} onCancel={handleCancelCreate} />}
      {selectedBug && <BugDetails bug={selectedBug} onClose={handleBugClose} />}
      <button onClick={() => setShowCreateForm(true)}>Create Bug</button>
      <DragDropContext onDragEnd={() => {}}>
        {['todo', 'inProgress', 'done'].map(status => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="column">
                <h2>{status.toUpperCase()}</h2>
                {bugs[status].map((bug, index) => (
                  <Draggable key={bug.id} draggableId={bug.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bug"
                        onClick={() => handleBugClick(bug)}
                      >
                        {bug.title}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default BugComponent;
