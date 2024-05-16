import React, { useState, useEffect } from 'react';
import FiltersPanel from './FiltersPanel';
import BugsBoard from './BugsBoard';
import CreateBugModal from './CreateBugModal';
import EditBugModal from './EditBugModal';
import SearchBar from './SearchBar';
import './BugComponent.css';

const BugComponent = () => {
    const [projects, setProjects] = useState([]);
    const [filters, setFilters] = useState({ project: '', assignee: [] });
    const [showCreateBugModal, setShowCreateBugModal] = useState(false);
    const [editBugData, setEditBugData] = useState(null);
    const [userRole, setUserRole] = useState('');
    const [forceUpdate, setForceUpdate] = useState(false);
    const [bugs, setBugs] = useState([]);

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        const role = localStorage.getItem("userRole");
        setUserRole(role);

        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:8080/project/getProjects', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: userEmail, role })
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
    }, [forceUpdate]); // Re-fetch projects on forceUpdate change

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const toggleCreateBugModal = () => {
        setShowCreateBugModal(!showCreateBugModal);
        setForceUpdate(f => !f);  // Toggle to trigger re-render
    };

    const openEditBugModal = (bug) => {
        setEditBugData(bug);
    };

    const closeEditBugModal = () => {
        setEditBugData(null);
        setForceUpdate(f => !f);
    };

    useEffect(() => {
        const fetchBugs = async () => {
            try {
                const response = await fetch('http://localhost:8080/bug/getBugsByUserAndSprint', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: localStorage.getItem("userEmail"), 
                        role: localStorage.getItem("userRole"), 
                        project: filters.project, 
                        assignee: filters.assignee,
                        sprint: localStorage.getItem("currentSprint") || '1' // Add sprint to the API request
                    })
                });
                if (response.ok) {
                    const fetchedBugs = await response.json();
                    setBugs(fetchedBugs);
                } else {
                    console.error('Failed to fetch bugs');
                }
            } catch (error) {
                console.error('Error fetching bugs:', error);
            }
        };

        fetchBugs();
    }, [filters]);

    return (
        <div>
            <div className="action-bar"> {/*new*/}
                {userRole !== 'developer' && (
                    <button onClick={toggleCreateBugModal} className="create-bug-button">Create Bug</button>
                )}
                <SearchBar bugs={bugs} onSelectBug={openEditBugModal} /> {/*new*/}
            </div>
            <FiltersPanel projects={projects} filters={filters} onFilterChange={handleFilterChange} />
            {showCreateBugModal && <CreateBugModal onClose={toggleCreateBugModal} projects={projects} />}
            {editBugData && <EditBugModal bug={editBugData} onClose={closeEditBugModal} />}
            <BugsBoard filters={filters} onEditBug={openEditBugModal} />
        </div>
    );
};

export default BugComponent;
