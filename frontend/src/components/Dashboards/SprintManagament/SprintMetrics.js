import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { saveAs } from "file-saver";
import { Box, Button, Modal, TableCell, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const SprintMetrics = ({ sprint, selectedProject }) => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      const fetchMetrics = async () => {
        setLoading(true);
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
          setError("Failed to load metrics. Please try again.");
          console.error(error);
        }
        setLoading(false);
      };
      fetchMetrics();
    }
  }, [sprint, selectedProject]);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSprintClose = async () => {
    closeModal();
    try {
      const response = await fetch("http://localhost:8080/sprint/close");
      if (response.ok) {
        const newSprint = await response.json();
        localStorage.setItem("currentSprint", newSprint.sprint);
        window.location.reload();
      } else {
        throw new Error("Failed to close the sprint");
      }
    } catch (error) {
      setError("Failed to close the sprint. Please try again.");
      console.error(error);
    }
  };

  const downloadCSV = () => {
    const headers = [
      "Assignee",
      "Total Bugs",
      "Total Story Points",
      "To Do Points",
      "In Progress Points",
      "Done Points",
    ];
    const csvRows = [headers.join(",")];

    // Iterate over the keys of the assigneeMetrics object
    for (const [assignee, data] of Object.entries(metrics.assigneeMetrics)) {
      const row = [
        assignee,
        data.totalBugs,
        data.totalStoryPoints,
        data["To Do"] || 0,
        data["In Progress"] || 0,
        data["Done"] || 0,
      ];
      csvRows.push(row.join(","));
    }

    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    saveAs(blob, "SprintMetrics.csv");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!metrics) return <div>No data available.</div>;

  const tableData = Object.entries(metrics.assigneeMetrics);
  console.log("tableData", tableData);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}>
        <div></div>
      </div>
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        sx={{
          margin: "auto",
          height: "100%",
          top: "50%",
        }}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description">
        <Box
          sx={{
            background: "white",
            width: "30%",
            alignSelf: "center",
            margin: "auto",
            borderRadius: "20px",
            padding: "40px 20px",
          }}>
          <h2
            style={{
              textAlign: "center",
            }}>
            Confirm Sprint Closure
          </h2>
          <p
            style={{
              textAlign: "center",
            }}>
            Do you really want to close the current sprint?
          </p>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}>
            <Button
              onClick={handleSprintClose}
              variant="contained"
              sx={{
                minWidth: "100px",
              }}>
              Yes
            </Button>
            <Button
              onClick={closeModal}
              variant="contained"
              sx={{
                minWidth: "100px",
              }}>
              No
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Close Sprint Confirmation">
        <h2>Confirm Sprint Closure</h2>
        <p>Do you really want to close the current sprint?</p>
        <button onClick={handleSprintClose}>Yes</button>
        <button onClick={closeModal}>No</button>
      </Modal> */}
      <div>
        <div
          style={{
            padding: "50px",
          }}>
          {tableData?.length > 0 ? (
            <TableContainer component={Paper}>
              <Table sx={{ width: "100%" }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "600",
                      }}>
                      Assignee
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "600",
                      }}>
                      Total Bugs
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "600",
                      }}
                      align="left">
                      Total Story Points
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "600",
                      }}
                      align="left">
                      To Do Points
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "600",
                      }}
                      align="left">
                      In Progress Points
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "600",
                      }}
                      align="left">
                      Done Points
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map(([assignee, data]) => (
                    <TableRow key={assignee}>
                      <TableCell component="th" scope="row">
                        {assignee}
                      </TableCell>
                      <TableCell align="center">{data.totalBugs}</TableCell>
                      <TableCell align="center">
                        {data.totalStoryPoints}
                      </TableCell>
                      <TableCell align="center">{data["To Do"] || 0}</TableCell>
                      <TableCell align="center">
                        {data["In Progress"] || 0}
                      </TableCell>
                      <TableCell align="center">{data["Done"] || 0}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "600",
                fontFamily: "Poppins",
                color: "grey",
                textAlign: "center",
                width: "100%",
              }}>
              No Data available for
              <span
                style={{
                  fontSize: "26px",
                  color: "black",
                }}>
                {" "}
                {selectedProject}{" "}
              </span>
              and Sprint{" "}
              <span
                style={{
                  fontSize: "26px",
                  color: "black",
                }}>
                {" "}
                {sprint}
              </span>
            </Typography>
          )}
          {/* <table>
            <thead>
              <tr>
                <th>Assignee</th>
                <th>Total Bugs</th>
                <th>Total Story Points</th>
                <th>To Do Points</th>
                <th>In Progress Points</th>
                <th>Done Points</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(metrics.assigneeMetrics).map(
                ([assignee, data]) => (
                  <tr key={assignee}>
                    <td>{assignee}</td>
                    <td>{data.totalBugs}</td>
                    <td>{data.totalStoryPoints}</td>
                    <td>{data["To Do"] || 0}</td>
                    <td>{data["In Progress"] || 0}</td>
                    <td>{data["Done"] || 0}</td>
                  </tr>
                )
              )}
            </tbody>
          </table> */}
          {tableData?.length > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "40px",
              }}>
              <Button onClick={downloadCSV} variant="contained">
                Download CSV
              </Button>
              <Button onClick={() => setModalIsOpen(true)} variant="contained">
                Close Sprint
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SprintMetrics;
