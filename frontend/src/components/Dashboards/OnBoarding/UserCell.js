import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserCell = ({ user, onSelectUser, handleSubmit, managers }) => {
  const [selectedRole, setSelectedRole] = useState(user?.role);
  const [selectedManager, setSelectedManager] = useState(user?.projectManager);

  const isNotProjectManager = selectedRole !== "projectManager";
  return (
    <Card
      sx={{
        padding: "12px",
        width: { sm: "100%", xs: "100%", lg: "45%", md: "45%" },
        borderRadius: "20px",
        cursor: "pointer",
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
              {user.email}
            </Typography>
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
            }}>
            Role:{" "}
            <FormControl
              required
              sx={{ m: 0, width: "50%", marginTop: "20px" }}
              onClick={(e) => {
                e.stopPropagation();
              }}>
              <InputLabel id="demo-simple-select-required-label">
                Select Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedRole ?? user?.role}
                style={{
                  marginBottom: "10px",
                  textAlign: "left",
                  width: "100%",
                  height: "40px",
                  marginLeft: "6px",
                }}
                placeholder="Select Role"
                label="Select Role"
                onChange={(e) => {
                  e.stopPropagation();
                  setSelectedRole(e.target.value);
                }}>
                <MenuItem value="projectManager">Project Manager</MenuItem>
                <MenuItem value="developer">Developer</MenuItem>
                <MenuItem value="tester">Tester</MenuItem>
                <MenuItem value="external user">External User</MenuItem>
              </Select>
            </FormControl>
          </Typography>
          {isNotProjectManager && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}>
              <Typography
                sx={{
                  marginTop: "-10px",
                }}>
                Manager:{" "}
              </Typography>
              <FormControl
                required
                sx={{ m: 0, width: "60%", marginLeft: "10px" }}
                onClick={(e) => {
                  e.stopPropagation();
                }}>
                <InputLabel id="demo-simple-select-required-label">
                  Project Manager
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedManager}
                  style={{
                    marginBottom: "10px",
                    textAlign: "left",
                    width: "100%",
                    height: "40px",
                  }}
                  placeholder="Project Manager"
                  label="Project Manager"
                  onChange={(e) => {
                    e.stopPropagation();
                    setSelectedManager(e.target.value);
                  }}>
                  {managers.map((manager) => (
                    <MenuItem key={manager.email} value={manager.email}>
                      {manager.email}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
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
            onClick={(e) => {
              e.stopPropagation();
              handleSubmit(
                "accepted",
                selectedRole,
                selectedManager,
                user.email
              );
            }}>
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
            onClick={(e) => {
              e.stopPropagation();
              handleSubmit("rejected");
            }}>
            Reject
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default UserCell;
