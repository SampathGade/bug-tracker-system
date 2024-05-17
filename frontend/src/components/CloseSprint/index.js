import React, { useEffect, useState } from "react";
import SprintMetrics from "../Dashboards/SprintManagament/SprintMetrics";
import { Box } from "@mui/material";
import FiltersPanel from "../Dashboards/ViewBug/FiltersPanel";
import Container from "../Container";

const CloseSprint = () => {
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({ project: "", assignee: [] });
  const [selectedProject, setSelectedProject] = useState("");

  const sprintOptions = Array.from({ length: 27 }, (_, i) => ({
    value: i + 1,
    label: `Sprint ${i + 1}`,
  })).concat({ value: "Backlog", label: "Backlog" });
  const currentSprint = localStorage.getItem("currentSprint") || "1";
  const [sprint, setSprint] = useState(currentSprint);

  const userEmail = localStorage.getItem("userEmail");
  const role = localStorage.getItem("userRole");

  useEffect(() => {
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
            setSelectedProject(projectsData[0].name);
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
  }, [role, userEmail]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setSelectedProject(newFilters?.project);
  };

  return (
    <Container bodyStyles={{ padding: 0 }}>
      <FiltersPanel
        projects={projects}
        filters={filters}
        onFilterChange={handleFilterChange}
        sprint={sprint}
        setSprint={setSprint}
        sprintOptions={sprintOptions}
        disablePeopleFilter={true}
      />
      <SprintMetrics sprint={sprint} selectedProject={selectedProject} />
    </Container>
  );
};

export default CloseSprint;
