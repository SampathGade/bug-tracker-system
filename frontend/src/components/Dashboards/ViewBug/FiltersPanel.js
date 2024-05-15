import React, { useState, useEffect } from "react";
import "./BugComponent.css";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const FiltersPanel = ({ filters, onFilterChange, projects, sprint,
    setSprint,sprintOptions }) => {

  const [assignees, setAssignees] = useState([]);

  useEffect(() => {
    const fetchAssignees = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/users/getDevelopersByProject",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: filters.project,
          }
        );
        if (response.ok) {
          const assigneesData = await response.json();
          setAssignees(assigneesData);
        } else {
          console.error("Failed to fetch assignees");
        }
      } catch (error) {
        console.error("Error fetching assignees:", error);
      }
    };

    if (filters.project) {
      fetchAssignees();
    }
  }, [filters.project]); // Dependency on project filter to re-fetch assignees

  const handleProjectChange = (e) => {
    onFilterChange({ ...filters, project: e.target.value });
  };

  const handleAssigneeChange = (assigneeEmail, isChecked) => {
    const newAssignees = isChecked
      ? [...filters.assignee, assigneeEmail]
      : filters.assignee.filter((a) => a !== assigneeEmail);
    onFilterChange({ ...filters, assignee: newAssignees });
  };

  const getInitials = (email) => email.substr(0, 2).toUpperCase();

  return (
    <div className="filters-panel">
      <FormControl required sx={{ m: 1, minWidth: 220 }}>
        <InputLabel id="demo-simple-select-required-label">
          Select Project
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filters.project}
          style={{
            textAlign: "left",
          }}
          placeholder="Select Project"
          label="Select Project"
          onChange={handleProjectChange}>
          {projects.map((project) => (
            <MenuItem value={project}>{project}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexBasis: "70%",
          justifyContent: "flex-end",
        }}>
        <FormControl required sx={{ m: 1, width: "100%", maxWidth: "200px" }}>
          <InputLabel
            id="demo-simple-select-required-label"
            sx={{
              color: "#0B65E4",
            }}>
            Select Sprint
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sprint}
            style={{
              marginBottom: "10px",
              textAlign: "left",
              width: "100%",
              backgroundColor: "#E9F2FF",
            }}
            placeholder="Select Sprint"
            label="Select Sprint"
            onChange={(e) => setSprint(e.target.value)}>
            {sprintOptions?.map((proj) => (
              <MenuItem key={proj?.label} value={proj.value}>
                {proj?.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="assignee-icons">
          {assignees.map((assignee) => (
            <div key={assignee} className="assignee-icon">
              <input
                type="checkbox"
                id={`assignee-${assignee}`}
                checked={filters.assignee.includes(assignee)}
                onChange={(e) =>
                  handleAssigneeChange(assignee, e.target.checked)
                }
                hidden
              />
              <label htmlFor={`assignee-${assignee}`}>
                <div className="icon-label">{getInitials(assignee)}</div>
              </label>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default FiltersPanel;
