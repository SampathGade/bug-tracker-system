import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { useLocation, useNavigate } from "react-router-dom";
import BugReportIcon from "@mui/icons-material/BugReport";
import FolderIcon from "@mui/icons-material/Folder";
import GroupsIcon from "@mui/icons-material/Groups";
import AssignmentTurnedInSharpIcon from "@mui/icons-material/AssignmentTurnedInSharp";
import TabletIcon from "@mui/icons-material/Tablet";
import { rolesList } from "../../../utils/constants";

const LeftPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const isDashboard = pathname === "/dashboard";
  const isBugs = pathname === "/bugs";
  const isCreateBug = pathname === "/create-bug";
  const isSprintDashboard = pathname === "/sprint-dashboard";
  const isCloseSprints = pathname === "/close-sprint";
  const isCreateProject = pathname === "/create-project";
  const isMyProjects = pathname === "/my-projects";
  const isOnBoarding = pathname === "/onboarding";
  const isMyTeam = pathname === "/my-team";
  const role = localStorage.getItem("userRole");
  const isAdmin = role === rolesList.admin;
  const isManager = role === rolesList.projectManager;
  const isTester = role === rolesList.tester;
  const isExternalUser = role === "external user";

  const [isBugsExpanded, setIsBugsExpanded] = useState(
    (isBugs || isCreateBug) ?? false
  );
  const [isSprintExpanded, setIsSprintExpanded] = useState(
    (isSprintDashboard || isCloseSprints) ?? false
  );
  const [isProjectExpanded, setIsProjectExpanded] = useState(
    (isCreateProject || isMyProjects) ?? false
  );

  if (isExternalUser) {
    return (
      <Box
        sx={{
          paddingLeft: "10px",
          paddingTop: "20px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            setIsBugsExpanded(!isBugsExpanded);
          }}
        >
          <BugReportIcon sx={{ color: isBugs ? "#1976d2" : "black" }} />
          <Typography
            sx={{
              fontSize: "18px",
              marginLeft: "10px",
              fontFamily: "Poppins",
              fontWeight: "500",
              color: isBugs ? "#1976d2" : "black",
            }}
          >
            Bugs
          </Typography>
        </Box>
        {isBugsExpanded && (
          <Box
            sx={{
              marginLeft: "33px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                marginTop: "8px",
                cursor: "pointer",
                fontFamily: "Poppins",
                fontWeight: "500",
                color: isBugs ? "#1976d2" : "black",
              }}
              onClick={() => navigate("/bugs")}
            >
              View Bugs
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                marginTop: "8px",
                cursor: "pointer",
                fontFamily: "Poppins",
                fontWeight: "500",
                color: isCreateBug ? "#1976d2" : "black",
              }}
              onClick={() => navigate("/create-bug")}
            >
              Create Bug
            </Typography>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        paddingLeft: "10px",
        paddingTop: "20px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/dashboard")}
      >
        <HomeIcon sx={{ color: isDashboard ? "#1976d2" : "black" }} />
        <Typography
          sx={{
            fontSize: "18px",
            marginLeft: "10px",
            fontFamily: "Poppins",
            fontWeight: "500",
            color: isDashboard ? "#1976d2" : "black",
          }}
        >
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
          setIsSprintExpanded(!isSprintExpanded);
        }}
      >
        <TabletIcon
          sx={{
            color: isSprintDashboard || isCloseSprints ? "#1976d2" : "black",
          }}
        />
        <Typography
          sx={{
            fontSize: "18px",
            marginLeft: "10px",
            fontFamily: "Poppins",
            fontWeight: "500",
            color: isSprintDashboard || isCloseSprints ? "#1976d2" : "black",
          }}
        >
          Sprints
        </Typography>
      </Box>
      {isSprintExpanded && (
        <Box
          sx={{
            marginLeft: "33px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              marginTop: "8px",
              cursor: "pointer",
              fontFamily: "Poppins",
              fontWeight: "500",
              color: isSprintDashboard ? "#1976d2" : "black",
            }}
            onClick={() => navigate("/sprint-dashboard")}
          >
            Sprint Dashboard
          </Typography>
          {(isAdmin || isManager) && (
            <Typography
              sx={{
                fontSize: "14px",
                marginTop: "8px",
                cursor: "pointer",
                fontFamily: "Poppins",
                fontWeight: "500",
                color: isCloseSprints ? "#1976d2" : "black",
              }}
              onClick={() => navigate("/close-sprint")}
            >
              Close Sprint
            </Typography>
          )}
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
          cursor: "pointer",
        }}
        onClick={() => {
          setIsBugsExpanded(!isBugsExpanded);
        }}
      >
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
          }}
        >
          Bugs
        </Typography>
      </Box>
      {isBugsExpanded && (
        <Box
          sx={{
            marginLeft: "33px",
          }}
        >
          {(isAdmin || isManager || isTester || isExternalUser) && (
            <Typography
              sx={{
                fontSize: "14px",
                marginTop: "8px",
                cursor: "pointer",
                fontFamily: "Poppins",
                fontWeight: "500",
                color: isCreateBug ? "#1976d2" : "black",
              }}
              onClick={() => navigate("/create-bug")}
            >
              Create Bug
            </Typography>
          )}
          <Typography
            sx={{
              fontSize: "14px",
              marginTop: "8px",
              cursor: "pointer",
              fontFamily: "Poppins",
              fontWeight: "500",
              color: isBugs ? "#1976d2" : "black",
            }}
            onClick={() => navigate("/bugs")}
          >
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
        onClick={() => {
          setIsProjectExpanded(!isProjectExpanded);
        }}
      >
        <FolderIcon
          sx={{ color: isCreateProject || isMyProjects ? "#1976d2" : "black" }}
        />
        <Typography
          sx={{
            fontSize: "18px",
            marginLeft: "10px",
            fontFamily: "Poppins",
            fontWeight: "500",
            color: isCreateProject || isMyProjects ? "#1976d2" : "black",
          }}
        >
          Projects
        </Typography>
      </Box>
      {isProjectExpanded && (
        <Box
          sx={{
            marginLeft: "33px",
          }}
        >
          {(isAdmin || isManager) && (
            <Typography
              sx={{
                fontSize: "14px",
                marginTop: "8px",
                cursor: "pointer",
                fontFamily: "Poppins",
                fontWeight: "500",
                color: isCreateProject ? "#1976d2" : "black",
              }}
              onClick={() => navigate("/create-project")}
            >
              Create New Project
            </Typography>
          )}
          <Typography
            sx={{
              fontSize: "14px",
              marginTop: "8px",
              cursor: "pointer",
              fontFamily: "Poppins",
              fontWeight: "500",
              color: isMyProjects ? "#1976d2" : "black",
            }}
            onClick={() => navigate("/my-projects")}
          >
            My Projects
          </Typography>
        </Box>
      )}
      {isAdmin && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/onboarding")}
        >
          <AssignmentTurnedInSharpIcon
            sx={{ color: isOnBoarding ? "#1976d2" : "black" }}
          />
          <Typography
            sx={{
              fontSize: "18px",
              marginLeft: "10px",
              fontFamily: "Poppins",
              fontWeight: "500",
              color: isOnBoarding ? "#1976d2" : "black",
            }}
          >
            On Boarding
          </Typography>
        </Box>
      )}
      {(isAdmin || isManager) && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/my-team")}
        >
          <GroupsIcon sx={{ color: isMyTeam ? "#1976d2" : "black" }} />
          <Typography
            sx={{
              fontSize: "18px",
              marginLeft: "10px",
              fontFamily: "Poppins",
              fontWeight: "500",
              color: isMyTeam ? "#1976d2" : "black",
            }}
          >
            My Team
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default LeftPanel;
