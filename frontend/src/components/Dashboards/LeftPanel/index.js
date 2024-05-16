import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { useLocation, useNavigate } from "react-router-dom";
import BugReportIcon from "@mui/icons-material/BugReport";
import FolderIcon from "@mui/icons-material/Folder";
import GroupsIcon from "@mui/icons-material/Groups";

const LeftPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const isDashboard = pathname === "/dashboard";
  const isBugs = pathname === "/bugs";
  const isCreateBug = pathname === "/create-bug";
  const isMyProjects = pathname === "/my-projects";
  const isOnBoarding = pathname === "/onboarding";
  const isMyTeam = pathname === "/my-team";
  const [isBugsExpanded, setIsBugsExpanded] = useState(
    (isBugs || isCreateBug) ?? false
  );

  return (
    <Box
      sx={{
        paddingLeft: "10px",
        paddingTop: "20px",
        backgroundColor: "#f0f0f0",
        // height: "100%",
      }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/dashboard")}>
        <HomeIcon sx={{ color: isDashboard ? "#1976d2" : "black" }} />
        <Typography
          sx={{
            fontSize: "18px",
            marginLeft: "10px",
            fontFamily: "Poppins",
            fontWeight: "500",
            color: isDashboard ? "#1976d2" : "black",
          }}>
          Dashboard
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
          cursor: "pointer",
        }}
        onClick={() => {
          setIsBugsExpanded(!isBugsExpanded);
        }}>
        <BugReportIcon
          sx={{ color: isBugs || isCreateBug ? "#1976d2" : "black" }}
        />
        <Typography
          sx={{
            fontSize: "18px",
            marginLeft: "10px",
            fontFamily: "Poppins",
            fontWeight: "500",
            color: isBugs || isCreateBug ? "#1976d2" : "black",
          }}>
          Bugs
        </Typography>
      </Box>
      {isBugsExpanded && (
        <Box
          sx={{
            marginLeft: "33px",
          }}>
          <Typography
            sx={{
              fontSize: "14px",
              marginTop: "8px",
              cursor: "pointer",
              fontFamily: "Poppins",
              fontWeight: "500",
              color: isCreateBug ? "#1976d2" : "black",
            }}
            onClick={() => navigate("/create-bug")}>
            Create Bug
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              marginTop: "8px",
              cursor: "pointer",
              fontFamily: "Poppins",
              fontWeight: "500",
              color: isBugs ? "#1976d2" : "black",
            }}
            onClick={() => navigate("/bugs")}>
            View Bugs
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/my-projects")}>
        <FolderIcon sx={{ color: isMyProjects ? "#1976d2" : "black" }} />
        <Typography
          sx={{
            fontSize: "18px",
            marginLeft: "10px",
            fontFamily: "Poppins",
            fontWeight: "500",
            color: isMyProjects ? "#1976d2" : "black",
          }}>
          My Projects
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/onboarding")}>
        <FolderIcon sx={{ color: isOnBoarding ? "#1976d2" : "black" }} />
        <Typography
          sx={{
            fontSize: "18px",
            marginLeft: "10px",
            fontFamily: "Poppins",
            fontWeight: "500",
            color: isOnBoarding ? "#1976d2" : "black",
          }}>
          On Boarding
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/my-team")}>
        <GroupsIcon sx={{ color: isMyTeam ? "#1976d2" : "black" }} />
        <Typography
          sx={{
            fontSize: "18px",
            marginLeft: "10px",
            fontFamily: "Poppins",
            fontWeight: "500",
            color: isMyTeam ? "#1976d2" : "black",
          }}>
          My Team
        </Typography>
      </Box>
    </Box>
  );
};

export default LeftPanel;
