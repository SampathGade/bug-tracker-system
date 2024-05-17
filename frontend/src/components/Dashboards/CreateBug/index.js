import React, { useEffect, useState } from "react";
import CreateBugModal from "../ViewBug/CreateBugModal";
import Container from "../../Container";

const CreateBug = () => {
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({ project: "", assignee: [] });
  const [userRole, setUserRole] = useState("");
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
  }, []); // Re-fetch projects on forceUpdate change
  return (
    <Container>
      <CreateBugModal onClose={() => null} projects={projects} />
    </Container>
  );
};

export default CreateBug;
