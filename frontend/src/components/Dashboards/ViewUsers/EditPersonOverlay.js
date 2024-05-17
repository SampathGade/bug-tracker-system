import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState, useEffect } from "react";

const EditPersonOverlay = ({ person, onClose }) => {
  const [role, setRole] = useState(person.role);
  const [managers, setManagers] = useState([]);
  const [projectManager, setProjectManager] = useState(
    person.projectManager || ""
  );

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/users/getProjectManagers"
        );
        if (response.ok) {
          const managerData = await response.json();
          setManagers(managerData.map((manager) => manager.email));
          // Initialize project manager to the existing value or the first one if not set
          if (!person.projectManager && managerData.length > 0) {
            setProjectManager(managerData[0].email);
          }
        } else {
          throw new Error("Failed to fetch managers");
        }
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };

    fetchManagers();
  }, [person.projectManager]);

  const handleUpdatePerson = async () => {
    const updatedDetails = { email: person.email, role, projectManager };
    const response = await fetch("http://localhost:8080/people/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedDetails),
    });
    if (response.ok) {
      onClose(); // Close the overlay and potentially refresh the list
    }
  };

  const disableUpdate = !projectManager || !role;
  console.log("role", !role);
  return (
    <div className="overlay" onClick={() => onClose()}>
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Person</h2>
        <p>Email: {person.email}</p>

        <FormControl sx={{ width: "100%", marginLeft: 0 }}>
          <InputLabel id="demo-simple-select-required-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{
              marginBottom: "10px",
              textAlign: "left",
              width: "100%",
            }}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={role === "admin"}
            placeholder="Role"
            label="Role">
            <MenuItem value="developer">Developer</MenuItem>
            <MenuItem value="tester">Tester</MenuItem>
            <MenuItem value="projectManager">Project Manager</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ width: "100%", marginLeft: 0 }}>
          <InputLabel id="demo-simple-select-required-label">
            Project Manager
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{
              marginBottom: "10px",
              textAlign: "left",
              width: "100%",
            }}
            value={projectManager}
            onChange={(e) => setProjectManager(e.target.value)}
            placeholder="Project Manager"
            label="Project Manager">
            {managers.map((email) => (
              <MenuItem key={email} value={email}>
                {email}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="form-actions">
          <Button
            onClick={onClose}
            variant="outlined"
            color="error"
            sx={{
              boxShadow: "none",
            }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleUpdatePerson}
            disabled={disableUpdate}>
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditPersonOverlay;
