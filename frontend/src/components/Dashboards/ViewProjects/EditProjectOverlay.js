import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const EditProjectOverlay = ({ project, onClose }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [projectManager, setProjectManager] = useState(
    project.projectManager || ""
  );
  const [developers, setDevelopers] = useState(project.developers || []);
  const [managers, setManagers] = useState([]);
  const [allDevelopers, setAllDevelopers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const managersResponse = await fetch(
        "http://localhost:8080/users/getProjectManagers"
      );
      const developersResponse = await fetch(
        "http://localhost:8080/users/getDevelopers"
      );
      const managersData = await managersResponse.json();
      const developersData = await developersResponse.json();
      setManagers(managersData);
      setAllDevelopers(developersData);
      setProjectManager(project.projectManager);
    };
    fetchData();
  }, [project.projectManager]);

  const handleUpdateProject = async () => {
    const updatedDetails = {
      id: project.id,
      name,
      description,
      projectManager,
      developers,
    };
    const response = await fetch(
      `http://localhost:8080/project/updateProject`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDetails),
      }
    );
    if (response.ok) {
      onClose();
    }
  };

  const handleAddDeveloper = (event) => {
    const selectedDeveloper = event.target.value;
    if (selectedDeveloper && !developers.includes(selectedDeveloper)) {
      setDevelopers([...developers, selectedDeveloper]);
    }
  };

  const handleRemoveDeveloper = (developerEmail) => {
    setDevelopers(developers.filter((dev) => dev !== developerEmail));
  };

  return (
    <div className="overlay" onClick={() => onClose()}>
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Project</h2>
        <div className="edit-form">
          <div>
            <TextField
              label="Project Name"
              required
              variant="outlined"
              style={{
                width: "100%",
                marginBottom: "10px",
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Description"
              required
              multiline
              variant="outlined"
              style={{
                width: "100%",
                marginBottom: "10px",
              }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormControl required sx={{ width: "100%", marginLeft: 0 }}>
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
                placeholder="Project Manager"
                label="Project Manager"
                value={projectManager}
                onChange={(e) => setProjectManager(e.target.value)}>
                <MenuItem value="" disabled>
                  Select a developer to add
                </MenuItem>
                {managers?.map((m) => (
                  <MenuItem key={m.id} value={m.email}>
                    {m.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}>
              {developers.map((dev) => (
                <div
                  key={dev}
                  style={{
                    borderRadius: "50px",
                    backgroundColor: "#E9F2FF",
                    color: "black",
                    padding: "6px 14px",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "16px",
                  }}>
                  {dev}
                  <DeleteIcon
                    sx={{
                      color: "red",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRemoveDeveloper(dev)}
                  />
                </div>
              ))}
            </Box>
            <FormControl required sx={{ width: "100%", marginLeft: 0 }}>
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
                onChange={handleAddDeveloper}
                defaultValue=""
                placeholder="Project Manager"
                label="Project Manager">
                <MenuItem value="" disabled>
                  Select a developer to add
                </MenuItem>
                {allDevelopers.map((dev) => (
                  <MenuItem key={dev.id} value={dev.email}>
                    {dev.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="form-actions">
          <Button
            variant="outlined"
            color="error"
            onClick={onClose}
            sx={{
              boxShadow: "none",
            }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleUpdateProject}>
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProjectOverlay;
