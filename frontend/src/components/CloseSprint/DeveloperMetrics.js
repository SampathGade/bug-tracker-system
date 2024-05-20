import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const DeveloperMetrics = ({ email, onBack }) => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/users/api/performance/developer?email=${email}`);
        if (response.ok) {
          const data = await response.json();
          setMetrics(data);
        } else {
          throw new Error("Failed to fetch metrics");
        }
      } catch (error) {
        setError("Failed to load metrics. Please try again.");
        console.error(error);
      }
      setLoading(false);
    };

    fetchMetrics();
  }, [email]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!metrics) return <div>No data available.</div>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Developer Metrics for {metrics.firstName} {metrics.lastName}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Metric</TableCell>
              <TableCell>Overall</TableCell>
              <TableCell>Last Sprint</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>{metrics.performances.pastPerformance.total}</TableCell>
              <TableCell>{metrics.performances.lastPerformance.total}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Completed</TableCell>
              <TableCell>{metrics.performances.pastPerformance.completed}</TableCell>
              <TableCell>{metrics.performances.lastPerformance.completed}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Spilled</TableCell>
              <TableCell>{metrics.performances.pastPerformance.spilled}</TableCell>
              <TableCell>{metrics.performances.lastPerformance.spilled}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={onBack} variant="contained" sx={{ mt: 2 }}>
        Back
      </Button>
    </Box>
  );
};

export default DeveloperMetrics;