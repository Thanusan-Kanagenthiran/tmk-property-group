"use client";

import { useRef, useState } from "react";
import { Button, TextField, Typography, Container, Alert, Box, Snackbar, Grid, FormControl } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import AppSpinner from "@/components/Common/AppSpinner";

const initialPasswordErrors = { currentPassword: "", newPassword: "" };

export default function EditPassword() {
  const passwordFormRef = useRef<HTMLFormElement>(null);
  const [passwordErrors, setPasswordErrors] = useState(initialPasswordErrors);
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [backendSuccess, setBackendSuccess] = useState<string | null>(null);
  const router = useRouter();

  const validatePasswordFields = (formData: FormData): boolean => {
    const formSubmissionErrors = { ...initialPasswordErrors };
    let isValid = true;

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;

    if (!currentPassword) {
      formSubmissionErrors.currentPassword = "Current password is required";
      isValid = false;
    }

    if (!newPassword) {
      formSubmissionErrors.newPassword = "New password is required";
      isValid = false;
    }

    setPasswordErrors(formSubmissionErrors);
    return isValid;
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    if (!validatePasswordFields(formData)) {
      setLoading(false);
      return;
    }

    try {
      const userData = {
        currentPassword: formData.get("currentPassword") as string,
        newPassword: formData.get("newPassword") as string
      };

      const response = await axios.put("/api/profile/password", userData);

      if (response.status === 200) {
        passwordFormRef.current?.reset();
        setPasswordErrors(initialPasswordErrors);
        setBackendSuccess("Password updated successfully.");
      }
    } catch (err: any) {
      // Handle error based on response from server
      const errorMessage = err.response?.data?.error || "An unknown error occurred.";
      setBackendError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle Snackbar close
  const handleClose = () => {
    if (backendError) {
      setBackendError(null);
      router.push("/dashboard");
    }
    setBackendSuccess(null);
  };

  return (
    <Container maxWidth="xs">
      <Snackbar autoHideDuration={3000} onClose={handleClose} open={!!backendError}>
        <Alert severity="error">{backendError}</Alert>
      </Snackbar>

      <Snackbar autoHideDuration={3000} onClose={handleClose} open={!!backendSuccess}>
        <Alert severity="success">{backendSuccess}</Alert>
      </Snackbar>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center"
        }}>
        <form style={{ maxWidth: "350px" }} ref={passwordFormRef} onSubmit={handlePasswordSubmit} autoComplete="off">
          <FormControl sx={{ mb: -0.4, width: "100%" }}>
            <Typography variant="body2" color="secondary" textAlign="left" sx={{ mb: -1.5 }}>
              Current Password
            </Typography>
            <TextField
              onClick={() => setPasswordErrors((prev) => ({ ...prev, currentPassword: "" }))}
              size="small"
              variant="outlined"
              margin="normal"
              type="password"
              name="currentPassword"
              error={!!passwordErrors.currentPassword}
              helperText={passwordErrors.currentPassword ? passwordErrors.currentPassword : " "}
            />
            <Typography variant="body2" color="secondary" textAlign="left" sx={{ mb: -1.5 }}>
              New Password
            </Typography>
            <TextField
              onClick={() => setPasswordErrors((prev) => ({ ...prev, newPassword: "" }))}
              size="small"
              variant="outlined"
              margin="normal"
              type="password"
              name="newPassword"
              error={!!passwordErrors.newPassword}
              helperText={passwordErrors.newPassword ? passwordErrors.newPassword : " "}
            />
          </FormControl>

          <Grid container justifyContent="center" gap={2}>
            <Button
              type="submit"
              variant="contained"
              startIcon={loading ? <AppSpinner size={15} /> : null}
              size="medium"
              fullWidth
              color="primary">
              Change Password
            </Button>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
