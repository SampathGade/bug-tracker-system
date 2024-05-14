import { Button, Card, Grid, Typography } from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserCell = ({ user, onSelectUser, handleSubmit }) => {
  return (
    <Card
      sx={{
        padding: "12px",
        width: { sm: "100%", xs: "100%", lg: "45%", md: "45%" },
        borderRadius: "20px",
        ":hover": {
          transition: "transform 0.15s ease-in-out",
          transform: "scale3d(1.05, 1.05, 1)",
        },
      }}
      onClick={() => onSelectUser(user)}>
      <Grid container sx={{ gap: "10px" }}>
        <Grid md={1.5} lg={1.5}>
          <AccountCircleIcon sx={{ fontSize: 50 }} />
        </Grid>
        <Grid item md={7.6} lg={7.6}>
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
              {user.email}sampathgade@gamil.com
            </Typography>
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
            }}>
            Role:{" "}
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                marginLeft: "10px",
              }}>
              {user.role}Developer
            </Typography>
          </Typography>
        </Grid>
        <Grid item md={2} lg={2} sx={{ textAlign: "end" }}>
          <Button
            variant="contained"
            sx={{
              height: "35px",
              ":hover": {
                backgroundColor: "green",
              },
            }}
            onClick={() => handleSubmit("accepted")}>
            Accept
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{
              height: "35px",
              marginTop: "10px",
              boxShadow: "none",
            }}
            onClick={() => handleSubmit("rejected")}>
            Reject
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default UserCell;
