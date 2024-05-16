import React from "react";
import ResponsiveAppBar from "../Dashboards/AppBar";
import { Grid } from "@mui/material";
import LeftPanel from "../Dashboards/LeftPanel";

const Container = ({ children, bodyStyles }) => {
  return (
    <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
      <ResponsiveAppBar />
      <Grid
        container
        sx={{
          flexGrow: 1,
        }}>
        <Grid
          item
          xs={3}
          md={2}
          lg={2}
          sx={{
            borderRight: "2px solid lightgrey",
          }}>
          <LeftPanel />
        </Grid>
        <Grid
          item
          xs={9}
          md={10}
          lg={10}
          sx={{
            bgcolor: "white",
            padding: "20px 50px",
            maxHeight: "calc(100vh - 64px) !important",
            overflowY: "auto",
            ...bodyStyles,
          }}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export default Container;
