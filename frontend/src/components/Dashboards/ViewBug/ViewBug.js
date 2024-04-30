import React, { useState } from 'react';
import FiltersPanel from './FiltersPanel';
import BugsBoard from './BugsBoard';
import CreateBugModal from './CreateBugModal';
import EditBugModal from './EditBugModal';
import './BugComponent.css'

const BugComponent = () => {
    const [filters, setFilters] = useState({ project: 'defaultProjectId', assignee: [] });
    const [showCreateBugModal, setShowCreateBugModal] = useState(false);
    const [editBugData, setEditBugData] = useState(null);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const toggleCreateBugModal = () => {
        setShowCreateBugModal(!showCreateBugModal);
    };

    const openEditBugModal = (bug) => {
        setEditBugData(bug); // Set the current bug data to be edited
    };

    const closeEditBugModal = () => {
        setEditBugData(null); // Clear the edit modal data on close
    };

    return (
      <div>
          <button onClick={toggleCreateBugModal} className="create-bug-button">Create Bug</button>
          <FiltersPanel filters={filters} onFilterChange={handleFilterChange} />
          {showCreateBugModal && <CreateBugModal onClose={toggleCreateBugModal} />}
          {editBugData && <EditBugModal bug={editBugData} onClose={closeEditBugModal} />}
          <BugsBoard filters={filters} onEditBug={openEditBugModal} />
      </div>
  );
};

export default BugComponent;
