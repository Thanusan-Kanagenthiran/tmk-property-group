"use client";

import { useRef, useState } from "react";
import { Button, TextField, Typography, Container, Alert, Box, Snackbar, Grid, FormControl } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import AppSpinner from "@/components/Common/AppSpinner";

const initialPhoneErrors = { phone: "" };

export default function EditPhoneNumber() {
  const phoneFormRef = useRef<HTMLFormElement>(null);
  const [phoneErrors, setPhoneErrors] = useState(initialPhoneErrors);
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [backendSuccess, setBackendSuccess] = useState<string | null>(null);
  const router = useRouter();

  const validatePhoneFields = (formData: FormData): boolean => {
    const formSubmissionErrors = { ...initialPhoneErrors };
    let isValid = true;

    const phone = formData.get("phone") as string;

    if (!phone) {
      formSubmissionErrors.phone = "Phone number is required";
      isValid = false;
    }

    setPhoneErrors(formSubmissionErrors);
    return isValid;
  };

  // Handle phone number form submission
  const handlePhoneSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    if (!validatePhoneFields(formData)) {
      setLoading(false);
      return;
    }

    try {
      const userData = {
        phone: formData.get("phone") as string
      };

      const response = await axios.put("/api/profile", userData);

      if (response.status === 200) {
        phoneFormRef.current?.reset();
        setPhoneErrors(initialPhoneErrors);
        setBackendSuccess("Phone number updated successfully.");
      }
    } catch (error: any) {
      setBackendError(error.response?.data?.message || "An error occurred");
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
        <form
          style={{ maxWidth: "350px", marginBottom: "2rem" }}
          ref={phoneFormRef}
          onSubmit={handlePhoneSubmit}
          autoComplete="off">
          <FormControl sx={{ mb: -0.4, width: "100%" }}>
            <Typography variant="body2" color="secondary" textAlign="left" sx={{ mb: -1.5 }}>
              Phone Number
            </Typography>
            <TextField
              onClick={() => setPhoneErrors((prev) => ({ ...prev, phone: "" }))}
              size="small"
              variant="outlined"
              margin="normal"
              name="phone"
              error={!!phoneErrors.phone}
              helperText={phoneErrors.phone ? phoneErrors.phone : " "}
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
              Update Phone Number
            </Button>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
