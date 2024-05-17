import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { rolesList } from "../../../utils/constants";

const EditUserOverlay = ({
  user,
  managers,
  handleSubmit,
  handleOverlayClick,
  role,
  setRole,
  projectManager,
  setManager,
}) => {
  console.log("role", role);
  const isNotProjectManager =
    role !== rolesList.projectManager && role !== rolesList.admin;
  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit User</h2>
        <p>Email: {user.email}</p>
        <FormControl sx={{ width: "100%", marginLeft: 0 }}>
          <InputLabel id="demo-simple-select-required-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{
              marginBottom: "10px",
              textAlign: "left",
              width: "100%",
            }}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role"
            label="Role">
            <MenuItem value="developer">Developer</MenuItem>
            <MenuItem value="tester">Tester</MenuItem>
            <MenuItem value="projectManager">Project Manager</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="External User">External User</MenuItem>
          </Select>
        </FormControl>
        {isNotProjectManager && (
          <FormControl sx={{ width: "100%", marginLeft: 0 }}>
            <InputLabel id="demo-simple-select-required-label">
              Select Project Manager
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{
                marginBottom: "10px",
                textAlign: "left",
                width: "100%",
              }}
              value={projectManager}
              onChange={(e) => setManager(e.target.value)}
              placeholder="Select Project Manager"
              label="Select Project Manager">
              {managers.map((manager) => (
                <MenuItem key={manager.email} value={manager.email}>
                  {manager.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleSubmit("rejected")}
            style={{
              flexBasis: "48%",
              boxShadow: "none",
            }}>
            Reject
          </Button>
          <Button
            variant="contained"
            onClick={() => handleSubmit("accepted")}
            style={{
              flexBasis: "48%",
            }}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditUserOverlay;
