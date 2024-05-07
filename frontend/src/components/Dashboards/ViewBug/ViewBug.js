import React, { useState, useEffect } from 'react';
import FiltersPanel from './FiltersPanel';
import BugsBoard from './BugsBoard';
import CreateBugModal from './CreateBugModal';
import EditBugModal from './EditBugModal';
import './BugComponent.css';

const BugComponent = () => {
    const [projects, setProjects] = useState([]); // Dynamic projects list
    const [filters, setFilters] = useState({ project: '', assignee: [] }); // Default filters
    const [showCreateBugModal, setShowCreateBugModal] = useState(false);
    const [editBugData, setEditBugData] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            const userEmail = localStorage.getItem("userEmail");
            const userRole = localStorage.getItem("userRole");
            try {
                const response = await fetch('http://localhost:8080/project/getProjects', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: userEmail, role: userRole })  // Adjusted payload keys
                });
                if (response.ok) {
                    const projectsData = await response.json();
                    setProjects(projectsData.map(p => p.name));
                    setFilters(f => ({ ...f, project: projectsData[0].name }));
                } else {
                    console.error('Failed to fetch projects');
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

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
