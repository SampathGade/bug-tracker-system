import React from "react";
import "./ViewProjectsComponent.css"; // Make sure to create appropriate CSS
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";

import { Box, Card, Grid, Typography } from "@mui/material";

const ProjectCell = ({ project, onSelectProject }) => {
  return (
    <Card
      sx={{
        padding: "12px",
        width: { sm: "100%", xs: "100%", lg: "46%", md: "46%" },
        borderRadius: "20px",
        cursor: "pointer",
        ":hover": {
          transition: "transform 0.15s ease-in-out",
          transform: "scale3d(1.05, 1.05, 1)",
        },
      }}
      onClick={() => onSelectProject(project)}>
      <Grid container sx={{ gap: "10px" }}>
        <Grid md={1.5} lg={1.5}>
          <FolderOpenRoundedIcon sx={{ fontSize: 50 }} />
        </Grid>
        <Grid item md={9.3} lg={9.3}>
          <Box
            sx={{
              marginLeft: "10px",
            }}>
            <Typography
              sx={{
                display: "flex",
                alignItems: "flex-start",
              }}>
              Project Name:{" "}
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginLeft: "10px",
                  wordBreak: "break-word",
                  textTransform: "capitalize",
                }}>
                {project.name}
              </Typography>
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                wordBreak: "break-word",
              }}>
              {project.description}
            </Typography>
            <Box
              sx={{
                marginTop: "10px",
              }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  wordBreak: "break-word",
                }}>
                Project Manager:{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  wordBreak: "break-word",
                }}>
                {project.projectManager}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProjectCell;
