import React, { useState, useEffect } from "react";
import FiltersPanel from "./FiltersPanel";
import BugsBoard from "./BugsBoard";
import CreateBugModal from "./CreateBugModal";
import EditBugModal from "./EditBugModal";
import SearchBar from "./SearchBar";
import "./BugComponent.css";

const BugComponent = () => {
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({ project: "", assignee: [] });
  const [showCreateBugModal, setShowCreateBugModal] = useState(false);
  const [editBugData, setEditBugData] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [forceUpdate, setForceUpdate] = useState(false); // State to trigger re-renders
  const [bugs, setBugs] = useState([]);

  const sprintOptions = Array.from({ length: 27 }, (_, i) => ({
    value: i + 1,
    label: `Sprint ${i + 1}`,
  })).concat({ value: "Backlog", label: "Backlog" });
  const currentSprint = localStorage.getItem("currentSprint") || "1";
  const [sprint, setSprint] = useState(currentSprint);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const role = localStorage.getItem("userRole");
    setUserRole(role);

    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/project/getProjects",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail, role }),
          }
        );
        if (response.ok) {
          const projectsData = await response.json();
          if (projectsData?.length > 0) {
            setProjects(projectsData.map((p) => p.name));
            setFilters((f) => ({ ...f, project: projectsData[0].name }));
          }
        } else {
          console.error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [forceUpdate]); // Re-fetch projects on forceUpdate change

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const toggleCreateBugModal = () => {
    setShowCreateBugModal(!showCreateBugModal);
    setForceUpdate((f) => !f); // Toggle to trigger re-render
  };

  const openEditBugModal = (bug) => {
    setEditBugData(bug);
  };

  const closeEditBugModal = () => {
    setEditBugData(null);
    setForceUpdate((f) => !f); // Toggle to trigger re-render
  };

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/bug/getBugsByUserAndSprint",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: localStorage.getItem("userEmail"),
              role: localStorage.getItem("userRole"),
              project: filters.project,
              assignee: filters.assignee,
              sprint: localStorage.getItem("currentSprint") || "1", // Add sprint to the API request
            }),
          }
        );
        if (response.ok) {
          const fetchedBugs = await response.json();
          setBugs(fetchedBugs);
        } else {
          console.error("Failed to fetch bugs");
        }
      } catch (error) {
        console.error("Error fetching bugs:", error);
      }
    };

    fetchBugs();
  }, [filters]);

  return (
    <div style={{ height: "100%" }}>
      <div className="action-bar">
        {" "}
        {/*new*/}
        {userRole !== "developer" && (
          <button onClick={toggleCreateBugModal} className="create-bug-button">
            Create Bug
          </button>
        )}
        <SearchBar bugs={bugs} onSelectBug={openEditBugModal} /> {/*new*/}
      </div>
      <FiltersPanel
        projects={projects}
        filters={filters}
        onFilterChange={handleFilterChange}
        sprint={sprint}
        setSprint={setSprint}
        sprintOptions={sprintOptions}
      />
      {showCreateBugModal && (
        <CreateBugModal onClose={toggleCreateBugModal} projects={projects} />
      )}
      {editBugData && (
        <EditBugModal bug={editBugData} onClose={closeEditBugModal} />
      )}
      <BugsBoard
        filters={filters}
        onEditBug={openEditBugModal}
        sprint={sprint}
      />
    </div>
  );
};

export default BugComponent;
