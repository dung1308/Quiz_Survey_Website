import React from "react";
import Layout from "../../components/templates/layout";
import { Box, Typography } from "@mui/material";

const About: React.FC = () => {
  return (
    <>
      <Layout />
      <Box
        sx={{
          width: { mr: 3 / 4 },
          height: "100vh",
          textAlign: "-webkit-center",
          overflow: "auto",
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "3vh" }}>
          This is the website to create survey. Its purpose is to make a survey
          contains the questions related to the problems and check how the
          participants can solve these problems.
        </Typography>
      </Box>
    </>
  );
};

export default About;
