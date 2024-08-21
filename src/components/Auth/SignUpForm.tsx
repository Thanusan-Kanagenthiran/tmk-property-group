"use client";

import { useRef, useState } from "react";
import { Button, TextField, Typography, Container, Alert, Box, Snackbar, Grid, FormControl } from "@mui/material";
import { register } from "@/actions/users/register";
import { Paths } from "@/constants/Paths";
import Link from "next/link";
import AppSpinner from "../Common/AppSpinner";
import { useRouter } from "next/navigation";

const initialErrors = { email: "", password: "", name: "" };

export default function RegisterForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPropertyOwner, setIsPropertyOwner] = useState(false);
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

    if (!formData.get("name")) {
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

    const userData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      name: formData.get("name") as string,
      role: isPropertyOwner ? "PROPERTY_OWNER" : "USER"
    };

    const response = await register(userData);

    setLoading(false);

    if (response?.error) {
      setBackendError(response.error);
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
      <Snackbar autoHideDuration={3000} onClose={handleClose} open={!!backendError}>
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

      <Snackbar autoHideDuration={3000} onClose={handleClose} open={!!backendSuccess}>
        <Alert
          severity="success"
          action={
            <Button href={Paths.SIGN_IN} color="inherit" size="small">
              Sign In 👉
            </Button>
          }>
          {backendSuccess}
        </Alert>
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
          {isPropertyOwner ? "🏠 Become a Property Owner 🏠" : "✨ Join the Community of Users ✨"}{" "}
          <Typography variant="body2">
            {isPropertyOwner ? "Want to rent a property❔ " : "Looking for a place to stay❔ "}
            <Link href={Paths.SIGN_UP}>
              <span onClick={() => setIsPropertyOwner((prev) => !prev)}>
                {isPropertyOwner ? "Register as a renter." : "Register as a property owner."}
              </span>
            </Link>
          </Typography>
        </Typography>

        <form style={{ maxWidth: "350px" }} ref={formRef} onSubmit={handleSubmit} autoComplete="off">
          <FormControl sx={{ mb: -1, width: "100%" }}>
            <Typography variant="body2" color="secondary" textAlign="left" sx={{ mb: -1.5 }}>
              Enter your name
            </Typography>
            <TextField
              onClick={() => setErrors((prev) => ({ ...prev, name: "" }))}
              size="small"
              variant="outlined"
              margin="normal"
              name="name"
              error={!!errors.name}
              helperText={errors.name ? errors.name : " "}
            />
          </FormControl>
          <FormControl sx={{ mb: -0.4, width: "100%" }}>
            <Typography variant="body2" color="secondary" textAlign="left" sx={{ mb: -1.5 }}>
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
            <Typography variant="body2" color="secondary" textAlign="left" sx={{ mb: -1.5 }}>
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
              Create Account
            </Button>
          </Grid>
          <Box mt={2}>
            <Typography variant="body2">
              Already have an account? <Link href={Paths.SIGN_IN}>Sign In</Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
