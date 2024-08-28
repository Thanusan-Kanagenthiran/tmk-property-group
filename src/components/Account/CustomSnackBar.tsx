import { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export default function CustomSnackbar({ open, onClose, severity, message }) {
  const router = useRouter();
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    if (shouldRefresh) {
      router.refresh();
      setShouldRefresh(false);
    }
  }, [shouldRefresh, router]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => {
        setShouldRefresh(true);
        onClose();
      }}>
      <Alert
        onClose={() => {
          setShouldRefresh(true);
          onClose();
        }}
        severity={severity}
        sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
