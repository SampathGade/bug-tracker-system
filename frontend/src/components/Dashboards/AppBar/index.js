import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";


const settings = ["Profile", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

 
  const handleCloseUserMenu = (e) => {
const value = e.target.innerHTML
    setAnchorElUser(null);
    if (value === "Logout") {
      console.log('value', value)
      handleLogout()
    } else if (value === "Dashboard") {
      navigate("/dashboard");
    }
  };

  const getUserInitials = () => {
    const email = localStorage.getItem("userEmail") || "";
    return email.substr(0, 2).toUpperCase();
  };

  const userInfo = getUserInitials()
  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
          }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}>
            Bug Tracking Tool
          </Typography>
          <Box>
            <Tooltip title="Open Profile">
              <Box
                onClick={handleOpenUserMenu}
                sx={{
                  borderRadius: "50px",
                  p: 1,
                  bgcolor: "grey",
                  color: "white",
                  cursor: "pointer",
                }}>
                <Typography>{userInfo}</Typography>
              </Box>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
