import React, { useState } from 'react';
import FiltersPanel from './FiltersPanel';
import BugsBoard from './BugsBoard';
import CreateBugModal from './CreateBugModal';
import EditBugModal from './EditBugModal';
import './BugComponent.css';

const BugComponent = () => {
    const projects = ['Project X', 'Project Y', 'Project Z']; // Centralized projects list
    const [filters, setFilters] = useState({ project: projects[0], assignee: [] }); // Default to the first project
    const [showCreateBugModal, setShowCreateBugModal] = useState(false);
    const [editBugData, setEditBugData] = useState(null);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const toggleCreateBugModal = () => {
        setShowCreateBugModal(!showCreateBugModal);
    };

    const openEditBugModal = (bug) => {
        setEditBugData(bug);
    };

    const closeEditBugModal = () => {
        setEditBugData(null);
    };

    return (
      <div>
          <button onClick={toggleCreateBugModal} className="create-bug-button">Create Bug</button>
          <FiltersPanel projects={projects} filters={filters} onFilterChange={handleFilterChange} />
          {showCreateBugModal && <CreateBugModal onClose={toggleCreateBugModal} projects={projects} />}
          {editBugData && <EditBugModal bug={editBugData} onClose={closeEditBugModal} />}
          <BugsBoard filters={filters} onEditBug={openEditBugModal} />
      </div>
    );
};

export default BugComponent;
