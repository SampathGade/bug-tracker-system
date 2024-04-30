import React, { useState } from 'react';

const CreateBugForm = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, assignee });
  };

  return (
    <div className="overlay">
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          Assignee:
          <input type="text" value={assignee} onChange={(e) => setAssignee(e.target.value)} />
        </label>
        <button type="submit">Create Bug</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default CreateBugForm;
