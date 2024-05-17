import { Box, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const PieChart = ({ sprint, selectedProject, title4 }) => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    if (selectedProject) {
      const fetchMetrics = async () => {
        try {
          const response = await fetch(
            "http://localhost:8080/api/metrics/sprint",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                project: selectedProject,
                sprint: Number(sprint),
              }),
            }
          );
          if (response.ok) {
            const data = await response.json();
            setMetrics(data);
          } else {
            throw new Error("Failed to fetch metrics");
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchMetrics();
    }
  }, [sprint, selectedProject]);

  const pieData = {
    labels: ["To Do", "In Progress", "Done"],
    datasets: [
      {
        data: [
          metrics?.statusCount["To Do"],
          metrics?.statusCount["In Progress"],
          metrics?.statusCount["Done"],
        ],
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe"],
      },
    ],
  };

  return (
    <Card
      style={{
        width: "100%",
        height: "100%",
        padding: "16px 0",
      }}>
      <Box
        sx={{
          marginLeft: "10px",
          display: "flex",
          alignItems: "center",
        }}>
        <DragIndicatorIcon />
        <Typography
          sx={{
            fontSize: "16px",
            color: "black",
            fontWeight: "600",
            fontFamily: "Poppins",
            marginLeft: "6px",
          }}>
          {title4}
        </Typography>
      </Box>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "10px",
        }}>
        <div
          style={{
            width: "300px",
            height: "360px",
          }}>
          <Pie data={pieData} />
        </div>
      </div>
    </Card>
  );
};

export default PieChart;
