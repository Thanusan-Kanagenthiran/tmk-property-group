"use client";

import { useRef, useState } from "react";
import { Button, TextField, Typography, Container, Alert, Box, Snackbar, Grid, FormControl } from "@mui/material";
import { Paths } from "@/constants/Paths";
import Link from "next/link";
import { signIn } from "next-auth/react";
import AppSpinner from "../Common/AppSpinner";
import { useRouter } from "next/navigation";

const initialErrors = { email: "", password: "" };

export default function Register() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [backendSuccess, setBackendSuccess] = useState<string | null>(null);

  const validateFields = (formData: FormData): boolean => {
    const formSubmissionErrors = { ...initialErrors };
    let isValid = true;

    if (!formData.get("email")) {
      isValid = false;
    }

    if (!formData.get("password")) {
      isValid = false;
    }

    setErrors(formSubmissionErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    if (!validateFields(formData)) {
      setLoading(false);
      return;
    }

    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false
    });

    setLoading(false);
    if (response?.error as string) {
      setBackendError(response?.error as string);
    } else {
      setBackendError(null);
      formRef.current?.reset();
      setErrors(initialErrors);
      setBackendSuccess("Registration successful. Please login.");
    }
  };

  const router = useRouter();
  const handleClose = () => {
    if (backendError) {
      setBackendError(null);
      router.push("/dashboard");
    }
    setBackendSuccess(null);
  };

  return (
    <Container maxWidth="xs">
      <Snackbar autoHideDuration={6000} onClose={handleClose} open={!!backendError}>
        <Alert
          severity="error"
          action={
            <Button href="/" color="inherit" size="small">
              Try Again 🤷‍♀️
            </Button>
          }>
          {backendError}
        </Alert>
      </Snackbar>

      <Snackbar autoHideDuration={6000} onClose={handleClose} open={!!backendSuccess}>
        <Alert severity="warning" onClose={() => {}}>
          This Alert displays the default close icon.
        </Alert>
        {/* <Alert
          severity="success"
          action={
            <Button href={Paths.HOME} color="inherit" size="small">
              Back to Home 🏡
            </Button>
          }>
          {backendSuccess}
        </Alert> */}
      </Snackbar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center"
        }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: "bold",
            mt: -3,
            mb: 4
          }}>
          Welcome Back
          <Typography variant="body2"> Sign In To continue to {process.env.NEXT_PUBLIC_APP_NAME}</Typography>
        </Typography>
        <form style={{ maxWidth: "350px" }} ref={formRef} onSubmit={handleSubmit} autoComplete="off">
          <FormControl sx={{ mb: -0.4, width: "100%" }}>
            <Typography variant="body1" color="secondary" textAlign="left" sx={{ mb: -1.5 }}>
              Email address
            </Typography>
            <TextField
              onClick={() => setErrors((prev) => ({ ...prev, email: "" }))}
              size="small"
              variant="outlined"
              margin="normal"
              name="email"
              error={!!errors.email}
              helperText={errors.email ? errors.email : " "}
            />
          </FormControl>

          <FormControl sx={{ mb: -0.4, width: "100%" }}>
            <Typography variant="body1" color="secondary" textAlign="left" sx={{ mb: -1.5 }}>
              Password
            </Typography>
            <TextField
              onClick={() => setErrors((prev) => ({ ...prev, password: "" }))}
              size="small"
              variant="outlined"
              margin="normal"
              name="password"
              type="password"
              error={!!errors.password}
              helperText={errors.password ? errors.password : " "}
            />
          </FormControl>

          <Grid container justifyContent="center" gap={2}>
            <Button
              type="submit"
              variant="contained"
              startIcon={loading ? <AppSpinner size={15} /> : ""}
              size="large"
              fullWidth
              color="primary">
              Sign In
            </Button>
          </Grid>
          <Box mt={2}>
            <Typography variant="body2">
              D&apos;ont have an account ? <Link href={Paths.SIGN_UP}> Sign Up </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
