import { Box, Card, Grid, Typography } from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const PersonCell = ({ person, onSelectPerson }) => {
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
      onClick={() => onSelectPerson(person)}>
      <Grid container sx={{ gap: "10px" }}>
        <Grid md={1.5} lg={1.5}>
          <AccountCircleIcon sx={{ fontSize: 50 }} />
        </Grid>
        <Grid item md={9.3} lg={9.3}>
          <Box>
            <Typography
              sx={{
                display: "flex",
                alignItems: "flex-start",
              }}>
              Email:{" "}
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginLeft: "10px",
                  wordBreak: "break-word",
                }}>
                {person.email}
              </Typography>
            </Typography>
            <Typography
              sx={{
                display: "flex",
                alignItems: "flex-start",
              }}>
              Role:{" "}
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginLeft: "10px",
                  wordBreak: "break-word",
                }}>
                {person.role}
              </Typography>
            </Typography>
            <Typography
              sx={{
                display: "flex",
                alignItems: "flex-start",
              }}>
              Project Manager:{" "}
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginLeft: "10px",
                  wordBreak: "break-word",
                }}>
                {person.projectManager}
              </Typography>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PersonCell;
