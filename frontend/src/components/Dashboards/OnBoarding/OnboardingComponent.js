import React, { useState, useEffect } from "react";
import UserCell from "./UserCell";
import EditUserOverlay from "./EditUserOverlay";
import "./OnboardingComponent.css"; // Import CSS
import Container from "../../Container";
import { Box, Typography } from "@mui/material";

const OnboardingComponent = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [refresh, setRefresh] = useState(false); // To trigger re-fetching
  const [role, setRole] = useState(selectedUser?.role);
  const [managers, setManagers] = useState([]); // Initialize managers as an empty array
  const [projectManager, setManager] = useState(selectedUser?.projectManager);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:8080/auth/pending");
      if (response.ok) {
        const data = await response.json();
        setUsers(data?.length > 0 ? data : null);
      }
    };

    fetchUsers();
  }, [refresh]); // Refresh dependency to re-fetch when needed

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setRole(user?.role);
    setManager(user?.projectManager);
  };

  const handleCloseOverlay = () => {
    setSelectedUser(null);
  };

  const triggerRefresh = () => {
    // Function to update refresh state
    setRefresh(!refresh);
  };

  useEffect(() => {
    const fetchManagers = async () => {
      const response = await fetch(
        "http://localhost:8080/users/getProjectManagers"
      ); // Adjust URL as needed
      if (response.ok) {
        const data = await response.json();
        setManagers(data);
        // Initialize projectManager with the email of the first manager or an existing value
        setManager(
          projectManager?.projectManager || (data?.length > 0 && data[0].email)
        );
      }
    };

    fetchManagers();
  }, [projectManager?.projectManager]); // Ensure this effect runs only once or when user.projectManager changes

  const handleSubmit = async (status, roleInfo, pm) => {
    const finalRole = roleInfo ?? role;
    const finalPM = pm ?? projectManager;
    const payload = {
      email: projectManager?.email,
      role: finalRole,
      projectManager: finalPM,
      status,
    };
    const response = await fetch("http://localhost:8080/auth/updateStatus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      handleCloseOverlay(); // Close overlay if successful
      triggerRefresh(); // Trigger refresh in parent component
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseOverlay();
    }
  };

  return (
    <Container>
      <Box>
        <Typography
          sx={{
            fontSize: "20px",
            fontFamily: "Poppins",
            fontWeight: "600",
          }}>
          On Boarding Pending List
        </Typography>
        <div
          className="onboarding-container"
          style={{
            marginTop: "20px",
          }}>
          {users?.length > 0 ? (
            users?.map((user) => (
              <UserCell
                key={user?.email}
                user={user}
                onSelectUser={handleSelectUser}
                handleSubmit={handleSubmit}
                managers={managers}
              />
            ))
          ) : (
            <Typography
              sx={{
                width: "100%",
                marginTop: "20px",
                textAlign: "center",
                fontSize: "40px",
                fontWeight: "600",
              }}>
              No Pending Requests
            </Typography>
          )}
          {selectedUser && (
            <EditUserOverlay
              user={selectedUser}
              handleSubmit={handleSubmit}
              handleOverlayClick={handleOverlayClick}
              role={role}
              setRole={setRole}
              projectManager={projectManager}
              setManager={setManager}
              managers={managers}
            />
          )}
        </div>
      </Box>
    </Container>
  );
};

export default OnboardingComponent;
