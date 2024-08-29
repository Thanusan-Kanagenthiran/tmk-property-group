"use client";
import ProfileImageUploadField from "./ProfileImageUploadField";
import { Box, Button, Snackbar, Alert, Grid } from "@mui/material";
import { useState, FormEvent, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PropertiesImagesUpload() {
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setImageUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [image, submitting]);

  const onImageChange = (file: File) => {
    setImage(file);
  };

  const onUploadHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!image) {
        setSnackbarMessage("Please select an image to upload");
        setSnackbarOpen(true);
        return;
      }

      const formData = new FormData();
      formData.append("image", image);

      await axios.put("/api/image", formData);
      setSnackbarMessage("Image uploaded successfully");
      setSeverity("success");
      setSnackbarOpen(true);
      setImage(null);
      router.refresh();
    } catch (error) {
      console.error("Error: ", error);
      setSnackbarMessage("An error occurred while uploading the image");
      setSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box maxWidth="100%" p={2}>
      <form onSubmit={onUploadHandler}>
        <Grid container spacing={3} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
          {imageUrl ? (
            <>
              <Image src={imageUrl} alt="Profile Image" width={200} height={200} style={{ borderRadius: "50%" }} />
              <Button size="small" type="submit" variant="contained" disabled={submitting}>
                Save
              </Button>
            </>
          ) : (
            <ProfileImageUploadField onImageChange={onImageChange} />
          )}
        </Grid>
      </form>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
