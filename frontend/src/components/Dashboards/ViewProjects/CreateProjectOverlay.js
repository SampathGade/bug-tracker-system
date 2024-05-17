import React, { useState, useEffect } from "react";
import Container from "../../Container";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CreateProjectOverlay = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [developers, setDevelopers] = useState([]);
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
    };
    fetchData();
  }, []);

  const handleCreateProject = async () => {
    const newProjectDetails = { name, description, projectManager, developers };
    const response = await fetch(
      "http://localhost:8080/project/createProject",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProjectDetails),
      }
    );
    if (response.ok) {
    } else {
      console.error("Failed to create project"); // Handle errors appropriately
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
    <Container>
      <div>
        <div>
          <h2>Create New Project</h2>
          <TextField
            id="outlined-basic"
            label="Project Name"
            variant="outlined"
            required
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              marginBottom: "20px",
            }}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            required
            multiline
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              marginBottom: "20px",
            }}
          />
          <FormControl required sx={{ m: 1, width: "100%", marginLeft: 0 }}>
            <InputLabel id="demo-simple-select-required-label">
              Project manager
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={projectManager}
              style={{
                marginBottom: "10px",
                textAlign: "left",
                width: "100%",
              }}
              placeholder="Project manager"
              label="Project manager"
              onChange={(e) => setProjectManager(e.target.value)}>
              <MenuItem value="" disabled>
                Select a manager
              </MenuItem>
              {managers?.map((proj) => (
                <MenuItem key={proj.id} value={proj.email}>
                  {proj?.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl required sx={{ m: 1, width: "100%", marginLeft: 0 }}>
            <InputLabel id="demo-simple-select-required-label">
              Developers
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={projectManager}
              style={{
                marginBottom: "10px",
                textAlign: "left",
                width: "100%",
              }}
              placeholder="Developers"
              label="Developers"
              onChange={handleAddDeveloper}>
              <MenuItem value="" disabled>
                Select a developer to add
              </MenuItem>
              {allDevelopers?.map((dev) => (
                <MenuItem key={dev.id} value={dev.email}>
                  {dev.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
          <div className="form-actions">
            <Button variant="contained" onClick={handleCreateProject}>
              Create Project
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreateProjectOverlay;
