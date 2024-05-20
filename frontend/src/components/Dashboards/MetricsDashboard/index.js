import React, { useEffect, useState } from "react";
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
import PieChart from "../SprintManagament/PieChart";
import { rolesList } from "../../../utils/constants";
import dayjs from "dayjs";

const MetricsDashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({ project: "", assignee: [] });
  const [bugs, setBugs] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const currentSprint = localStorage.getItem("currentSprint") || "1";
  const [sprint, setSprint] = useState(currentSprint);

  const userEmail = localStorage.getItem("userEmail");
  const userFirstName = localStorage.getItem("userFirstName");
  const userLastName = localStorage.getItem("userLastName") || "";
  const role = localStorage.getItem("userRole");
  const isAdmin = role === rolesList.admin;
  const isManager = role === rolesList.projectManager;
  const title1 = isAdmin || isManager ? "All Issues" : "My Issues";
  const title2 =
    isAdmin || isManager ? "Work Items Due Today" : "My Work Items Due Today";
  const title3 = isAdmin || isManager ? "Backlogs" : "My Backlogs";
  const title4 = `Sprint ${sprint} Progress`;

  useEffect(() => {
    if (!localStorage.getItem("userEmail")) {
      navigate("/login");
    }
  }, [navigate]);

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

  const sprintOptions = Array.from({ length: 27 }, (_, i) => ({
    value: i + 1,
    label: `Sprint ${i + 1}`,
  })).concat({ value: "Backlog", label: "Backlog" });

  const dueTodayBugs = bugs?.filter((item) => {
    const budEta = dayjs(item?.slaDate).format("DD/MM/YYYY");
    const today = dayjs().format("DD/MM/YYYY");
    if (budEta === today) {
      return item;
    }
  });
  const backlogBugs = bugs?.filter((item) => {
    const budEta = dayjs(item?.slaDate);
    const currentDate = dayjs();
    const isBacklog = budEta.isBefore(currentDate);
    if (isBacklog) {
      return item;
    }
  });

  const openBugsCount = bugs?.filter((bug) => bug.status !== "Done").length;
  const closedBugsCount = bugs?.filter((bug) => bug.status === "Done").length;

  const displayName = userLastName ? `${userFirstName} ${userLastName}` : userFirstName;


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
             {displayName}
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
          Email:
          <Typography
            sx={{
              fontSize: "16px",
              color: "black",
              fontWeight: "600",
              marginLeft: "6px",
              fontFamily: "Poppins",
            }}>
            {userEmail}
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
                  {openBugsCount}
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
                  {closedBugsCount}
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
            <MyIssues
              bugs={bugs}
              title={title1}
              isAdmin={isAdmin}
              isManager={isManager}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5.8} lg={5.8}>
            <MyIssues title={title2} bugs={dueTodayBugs} />
          </Grid>
          <Grid item xs={12} sm={12} md={5.8} lg={5.8}>
            <MyIssues title={title3} bugs={backlogBugs} />
          </Grid>
          <Grid item xs={12} sm={12} md={5.8} lg={5.8}>
            <PieChart
              sprint={sprint}
              selectedProject={selectedProject}
              title4={title4}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MetricsDashboard;
