import React, { useEffect, useState } from "react";
import SprintMetrics from "../SprintManagament/SprintMetrics";
import Container from "../../Container";
import {
  Box,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import MyIssues from "./MyIssues";
import { useNavigate } from "react-router-dom";

const MetricsDashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({ project: "", assignee: [] });
  const [bugs, setBugs] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [sprint, setSprint] = useState(
    localStorage.getItem("currentSprint") || "1"
  );
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
            setProjects(projectsData.map((p) => p?.name));
            setSelectedProject(projectsData?.[0]?.name);
            setFilters((f) => ({ ...f, project: projectsData[0]?.name }));
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
              project: selectedProject,
              assignee: filters.assignee,
              sprint: sprint, // Add sprint to the API request
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
  }, [filters, selectedProject, sprint]); // Add currentSprint to the dependency array

  console.log("projects", bugs);

  const sprintOptions = Array.from({ length: 27 }, (_, i) => ({
    value: i + 1,
    label: `Sprint ${i + 1}`,
  })).concat({ value: "Backlog", label: "Backlog" });

  return (
    <Container>
      <Box
        sx={{
          marginTop: "20px",
          marginBottom: "20px",
        }}>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: "400",
            fontFamily: "Poppins",
          }}>
          Welcome
          <Typography
            sx={{
              fontSize: "16px",
              color: "black",
              fontWeight: "600",
              marginLeft: "10px",
              fontFamily: "Poppins",
            }}>
            {" "}
            Sai Sampath Gade
          </Typography>
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            color: "grey",
            display: "flex",
            alignItems: "center",
            fontFamily: "Poppins",
          }}>
          Company:
          <Typography
            sx={{
              fontSize: "16px",
              color: "black",
              fontWeight: "600",
              marginLeft: "6px",
              fontFamily: "Poppins",
            }}>
            saisampathgadeuk@gmail.com
          </Typography>
        </Typography>
        <Grid
          container
          item
          sx={{
            marginTop: "20px",
            gap: "10px",
          }}>
          <Grid item xs={5.8} sm={5.8} md={3} lg={3}>
            <Card
              sx={{
                padding: "10px",
                borderBottom: "5px solid red",
                borderRadius: "10px",
                cursor: "pointer",
                maxWidth: "100%",
                ":hover": {
                  transition: "transform 0.15s ease-in-out",
                  transform: "scale3d(1.05, 1.05, 1)",
                },
              }}
              onClick={() => navigate("/bugs")}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "20px",
                    color: "red",
                    fontWeight: "600",
                    fontFamily: "Poppins",
                  }}>
                  0
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "red",
                    fontWeight: "500",
                    fontFamily: "Poppins",
                  }}>
                  Open Issues
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={5.8} sm={5.8} md={3} lg={3}>
            <Card
              sx={{
                padding: "10px",
                borderBottom: "5px solid green",
                borderRadius: "10px",
                cursor: "pointer",
                maxWidth: "100%",
                ":hover": {
                  transition: "transform 0.15s ease-in-out",
                  transform: "scale3d(1.05, 1.05, 1)",
                },
              }}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "20px",
                    color: "green",
                    fontWeight: "600",
                    fontFamily: "Poppins",
                  }}>
                  10
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "green",
                    fontWeight: "500",
                    fontFamily: "Poppins",
                  }}>
                  Closed Issues
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={5.8} sm={5.8} md={5.7} lg={5.7}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}>
              <FormControl
                required
                sx={{
                  m: 1,
                  width: "100%",
                  maxWidth: "200px",
                  marginLeft: 0,
                }}>
                <InputLabel
                  id="demo-simple-select-required-label"
                  sx={{
                    color: "#0B65E4",
                  }}>
                  Select Project
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedProject}
                  style={{
                    marginBottom: "10px",
                    textAlign: "left",
                    width: "100%",
                    backgroundColor: "#E9F2FF",
                    borderColor: "#0B65E4",
                  }}
                  placeholder="Select Project"
                  label="Select Project"
                  onChange={(e) => setSelectedProject(e.target.value)}>
                  {projects?.map((proj) => (
                    <MenuItem key={proj} value={proj}>
                      {proj}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                required
                sx={{ m: 1, width: "100%", maxWidth: "200px", marginLeft: 0 }}>
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
            </Box>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            marginTop: "20px",
            display: "flex",
            alignItems: "flex-start",
            gap: "20px",
          }}>
          <Grid item xs={12} sm={12} md={5.8} lg={5.8}>
            <MyIssues bugs={bugs} />
          </Grid>
          <Grid item xs={12} sm={12} md={5.8} lg={5.8}>
            <MyIssues title={"My Work Items Due Today"} bugs={bugs} />
          </Grid>
          <Grid item xs={12} sm={12} md={5.8} lg={5.8}>
            <MyIssues title={"My Backlogs"} bugs={bugs} />
          </Grid>
        </Grid>
      </Box>
      <SprintMetrics sprint={sprint} selectedProject={selectedProject} />
    </Container>
  );
};

export default MetricsDashboard;
