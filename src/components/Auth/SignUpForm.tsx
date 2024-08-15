"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextField, Typography, Container, Alert, Box, Link } from "@mui/material";
import { register } from "@/actions/users/register";
import { Paths } from "@/constants/Paths";

export default function Register() {
  const [isPropertyOwner, setIsPropertyOwner] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", name: "", phone: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  const validateFields = (formData: FormData) => {
    let valid = true;
    const newErrors = { email: "", password: "", name: "", phone: "", image: "" };

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const image = formData.get("image") as string;

    if (!email || !email.includes("@")) {
      newErrors.email = "Invalid email address.";
      valid = false;
    }

    if (!password || password.length < 4) {
      newErrors.password = "Password must be at least 6 characters long.";
      valid = false;
    }

    if (!name) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    if (!phone || phone.length < 10) {
      newErrors.phone = "Phone number is invalid.";
      valid = false;
    }

    if (!image) {
      newErrors.image = "Image is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!validateFields(formData)) return;

    setLoading(true);

    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    const phone = formData.get("phone");
    const image = formData.get("image");

    const response = await register({
      email: email as string,
      password: password as string,
      name: name as string,
      phone: phone as string,
      image: image as string,
      role: isPropertyOwner ? "PROPERTY_OWNER" : ("USER" as string),
    });

    setLoading(false);

    if (response?.error) {
      setBackendError(response.error);
    } else {
      setBackendError(null);
      ref.current?.reset();
      router.push(`/sign-in?success=${encodeURIComponent("Registration successful! Please sign in.")}`);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}>
        <Box mt={2}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: isPropertyOwner ? "primary.main" : "secondary.main",
            }}>
            {!isPropertyOwner ? "✨ Join the Community of Users ✨" : "🏠 Become a Property Owner 🏠"}
          </Typography>

          <Typography variant="body1" sx={{ color: "text.secondary", mt: 2 }}>
            {!isPropertyOwner
              ? "Enter your email and password to sign up and start exploring property listings!"
              : "Sign up with your email and password to manage your properties and connect with renters!"}
          </Typography>

          <Typography
            onClick={() => setIsPropertyOwner((prevState) => !prevState)}
            sx={{
              color: "primary.main",
              cursor: "pointer",
            }}>
            {isPropertyOwner ? "Register as a renter" : "Register as a property owner"}
          </Typography>
        </Box>
        {backendError && (
          <Alert variant="outlined" severity="error">
            This is an outlined error Alert.
          </Alert>
        )}
        <form ref={ref} onSubmit={handleSubmit}>
          <TextField
            variant="standard"
            autoComplete="off"
            fullWidth
            margin="normal"
            label="Full Name"
            name="name"
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            variant="standard"
            autoComplete="off"
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            variant="standard"
            autoComplete="off"
            fullWidth
            margin="normal"
            label="Phone"
            name="phone"
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            variant="standard"
            autoComplete="off"
            fullWidth
            margin="normal"
            label="Image"
            name="image"
            error={!!errors.image}
            helperText={errors.image}
          />
          <TextField
            variant="standard"
            autoComplete="off"
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            error={!!errors.password}
            helperText={errors.password}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
          <Box mt={2}>
            <Typography variant="body2" >
              Already have an account?<Link href={Paths.SIGN_IN}> Sign In </Link>
            </Typography>
          </Box>
        </form>{" "}
      </Box>
    </Container>
  );
}
