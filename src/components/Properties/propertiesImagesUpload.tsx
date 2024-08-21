"use client";
import ImageUploadField from "./ImageUploadField";
import { Box, Button, Snackbar, Alert, TextField } from "@mui/material";
import AddFormContainer from "../Common/Layout/AddFormContainer";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

export default function PropertiesImagesUpload() {
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    }
  };

  const onImageChange = (file: File) => {
    setImage(file);
  };

  const onUploadHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!image || !name) {
        setSnackbarMessage("Please select an image and provide a name");
        setSnackbarOpen(true);
        return;
      }

      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);

      await axios.post("/api/abc", formData);
      setSnackbarMessage("Image uploaded successfully");
      setSeverity("success");
      setSnackbarOpen(true);
      setImage(null);
      setName("");
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
    <AddFormContainer>
      <Box maxWidth="lg">
        <h2>Add Images here</h2>
        <form onSubmit={onUploadHandler}>
          <TextField
            type="text"
            name="name"
            value={name}
            size="small"
            onChange={onInputChange}
            placeholder="Enter image name"
            disabled={submitting}
            sx={{ mb: 2 }}
          />
          <ImageUploadField onImageChange={onImageChange} />
          <Box sx={{ mt: -4, px: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button size="small" color="secondary" type="submit" variant="contained" disabled={submitting}>
              Submit
            </Button>
          </Box>
        </form>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
          <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <h2 className="text-xl font-bold mb-4">Images</h2>
      </Box>
    </AddFormContainer>
  );
}
