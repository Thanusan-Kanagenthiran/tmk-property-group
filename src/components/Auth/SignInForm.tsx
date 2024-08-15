"use client";
import { FormEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, TextField, Typography, Container, Alert, Box } from "@mui/material";
import Link from "next/link";
import { Paths } from "@/constants/Paths";

export default function SignInForm() {
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [backendError, setBackendError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const validateFields = (formData: FormData) => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    if (!email || !email.includes("@")) {
      newErrors.email = "Invalid email address.";
      valid = false;
    }

    if (!password || password.length < 4) {
      newErrors.password = "Password must be at least 6 characters long.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (!validateFields(formData)) return; // Stop submission if validation fails

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setBackendError(result.error as string);
    } else if (result?.ok) {
      router.push("/");
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const queryParams = new URLSearchParams(url.search);
    const success = queryParams.get("success");
    if (success) {
      setSuccessMessage(decodeURIComponent(success));
    }
  }, []);

  return (
    <Container maxWidth="xs">
      <Box my={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", justifyContent: "center", minHeight: "100vh" }}>
        {backendError && <Alert severity="error">{backendError}</Alert>}
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>

        <Typography variant="body1" sx={{ color: "text.secondary", mt: 2 }} gutterBottom>
            Enter your email and password to access your account.
          </Typography>

        {successMessage && (
          <Alert variant="outlined" severity="success">
            {successMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            variant="standard"
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            autoComplete="off"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            variant="standard"
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            autoComplete="off"
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button  type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 4 }}>
            Sign In
          </Button>
          <Box mt={2}>
            <Typography variant="body2" align="center">
              Don&apos;t have an account? <Link href={Paths.SIGN_UP}>Register</Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
