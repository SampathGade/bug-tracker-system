import { Box, Card, Typography } from "@mui/material";
import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const MyIssues = ({ bugs, title }) => {
  return (
    <Box>
      <Card
        sx={{
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
            {title || "My Issues"}
          </Typography>
        </Box>
        <Box
          sx={{
            height: "45vh",
            paddingTop: "20px",
            overflowY: "auto",
          }}>
          {bugs?.map((item, index) => {
            return (
              <Box
                sx={{
                  borderRadius: "10px",
                  border: "1px solid lightgrey",
                  padding: "10px",
                  marginBottom: "10px",
                  cursor: "pointer",
                  maxWidth: "85%",
                  marginLeft: "16px",
                  ":hover": {
                    transition: "transform 0.15s ease-in-out",
                    transform: "scale3d(1.02, 1.02, 1)",
                  },
                }}
                key={index}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                    fontFamily: "Poppins",
                  }}>
                  {item?.name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "14px",
                    fontFamily: "Poppins",
                    marginTop: "10px",
                  }}>
                  Description:
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      fontFamily: "Poppins",
                      marginTop: "5px",
                      lineHeight: "1",
                    }}>
                    {" "}
                    {item?.description}
                  </Typography>
                </Typography>

                <Typography
                  sx={{
                    fontSize: "14px",
                    fontFamily: "Poppins",
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}>
                  Status:
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      fontFamily: "Poppins",
                      marginLeft: "10px",
                    }}>
                    {item?.status}
                  </Typography>
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontFamily: "Poppins",
                    display: "flex",
                    alignItems: "center",
                  }}>
                  Type:
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      fontFamily: "Poppins",
                      marginLeft: "10px",
                    }}>
                    {item?.type}
                  </Typography>
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Card>
    </Box>
  );
};

export default MyIssues;
