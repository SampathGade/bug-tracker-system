import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Container from "../Container";
import SearchBar from "../Dashboards/ViewBug/SearchBar";

const ViewBugsList = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [bugs, setBugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const currentSprint = localStorage.getItem("currentSprint") || "1";

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        "http://localhost:8080/project/getProjects",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail, role: userRole }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
        if (data.length > 0) {
          setSelectedProject(data[0].name);
        }
      }
    };
    fetchProjects();
  }, [userEmail, userRole]);

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
              assignee: [],
              sprint: currentSprint, // Add sprint to the API request
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
  }, [selectedProject]); // Add currentSprint to the dependency array
  console.log("Container bugs", bugs);

  const finalBugs = bugs?.filter(
    (item) =>
      item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item?.assignee?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );
  return (
    <Container>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Typography
          sx={{
            fontSize: "20px",
            fontFamily: "Poppins",
            fontWeight: "600",
          }}>
          Bugs List
        </Typography>
        <FormControl
          required
          sx={{ m: 1, alignSelf: "end", width: "200px", marginLeft: 0 }}>
          <InputLabel id="demo-simple-select-required-label">
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
            }}
            placeholder="Select Project"
            label="Select Project"
            onChange={(e) => {
              setSelectedProject(e.target.value);
              setSearchTerm("");
            }}>
            {projects.map((proj) => (
              <MenuItem key={proj.name} value={proj.name}>
                {proj.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Box>
        <input
          type="text"
          placeholder="Search by bug name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          marginTop: "20px",
        }}>
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "600",
                  }}>
                  Bug Id
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                  }}>
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                  }}
                  align="left">
                  Description
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                  }}
                  align="left">
                  Assigned To
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                  }}
                  align="left">
                  Sprint
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                  }}
                  align="left">
                  Story Points
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                  }}
                  align="left">
                  Type
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                  }}
                  align="left">
                  End Date
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                  }}
                  align="left">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {finalBugs?.map((item) => (
                <TableRow key={item?.id}>
                  <TableCell component="th" scope="row">
                    {item?.id}
                  </TableCell>
                  <TableCell align="left">{item?.name}</TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      maxWidth: "200px",
                    }}>
                    {item?.description}
                  </TableCell>
                  <TableCell align="left">{item?.assignee}</TableCell>
                  <TableCell align="center">{item?.sprint}</TableCell>
                  <TableCell align="center">{item?.storyPoints}</TableCell>
                  <TableCell align="left">{item?.type}</TableCell>
                  <TableCell align="left">{item?.slaDate}</TableCell>
                  <TableCell align="left">{item?.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default ViewBugsList;
