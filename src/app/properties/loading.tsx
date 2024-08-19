import AppSpinner from "@/components/Common/AppSpinner";
import { Box } from "@mui/material";
import React from "react";

const loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        maxHeight: "100%",
        width: "100%"
      }}>
      <AppSpinner size={75} />
    </Box>
  );
};

export default loading;
