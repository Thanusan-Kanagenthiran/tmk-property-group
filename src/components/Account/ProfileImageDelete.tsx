"use client";
import { Box, Button, Snackbar, Alert, Grid } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import React from "react";

export default function ProfileImageDelete() {
  const [submitting, setSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const router = useRouter();

  const deleteHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.delete("/api/image");
      setSnackbarMessage("Image deleted successfully");
      setSeverity("success");
      setSnackbarOpen(true);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error: ", error);
      setSnackbarMessage("An error occurred while deleting the image");
      setSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <Button onClick={deleteHandler} disabled={submitting} sx={{ display: "flex", justifyContent: "center" }}>
        <CloudDoneIcon color="success" />
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => {
          router.refresh();
          setSnackbarOpen(false);
        }}>
        <Alert
          onClose={() => {
            router.refresh();
            setSnackbarOpen(false);
          }}
          severity={severity}
          sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
