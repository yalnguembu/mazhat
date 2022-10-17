import { Paper } from "@mui/material";
import React from "react";

function NotFound() {
  return (
    <div className="authContainer">
      <Paper
        sx={{
          width: { xs: "100%", md: "50%" },
          height: 200,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        page not found
      </Paper>
    </div>
  );
}

export default NotFound;
