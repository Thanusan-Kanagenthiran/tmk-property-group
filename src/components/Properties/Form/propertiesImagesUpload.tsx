"use client";
import ImageUploadField from "./ImageUpload/ImageUploadField";
import { Box, Button, Snackbar, Alert, Grid, Typography, Paper } from "@mui/material";
import AddFormContainer from "../../Common/Layout/AddFormContainer";
import { useState, FormEvent, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import PropertiesImageList from "./PropertiesImageList";

export default function PropertiesImagesUpload({ propertyId }: { propertyId: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [images, setImages] = useState<{ url: string; public_id: string }[]>([]);

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setImageUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [image]);

  useEffect(() => {
    // Fetch images whenever the component mounts or the propertyId changes
    const fetchImages = async () => {
      try {
        const response = await axios.get(`/api/property/${propertyId}/images`);
        setImages(response.data.data || []);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [propertyId]);

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

      await axios.post(`/api/property/${propertyId}/images`, formData);
      setSnackbarMessage("Image uploaded successfully");
      setSeverity("success");
      setSnackbarOpen(true);

      // Refetch the images after uploading
      const response = await axios.get(`/api/property/${propertyId}/images`);
      setImages(response.data.data || []);

      // Reset form state
      setImage(null);
      setImageUrl(null);
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
    <Box>
      <Typography ml={2} py={2} variant="body1" color="text.primary" textAlign="left">
        Property Images
      </Typography>
      <Paper>
        <Box maxWidth="lg" p={2}>
          <form onSubmit={onUploadHandler}>
            <Grid container spacing={3} justifyContent={"space-between"} alignItems={"baseline"}>
              <Grid item xs>
                <ImageUploadField onImageChange={onImageChange} /> 
              </Grid>
              <Grid item xs={6}>
                {imageUrl && <Image width={480} height={270} src={imageUrl} alt="uploaded image" />}
              </Grid>
              <Grid item xs>
                <Box sx={{ mt: -4, display: "flex", justifyContent: "flex-end" }}>
                  <Button size="small" type="submit" sx={{ px: 4 }} variant="contained" disabled={submitting}>
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
          <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
            <Alert onClose={() => setSnackbarOpen(false)} severity={severity} sx={{ width: "100%" }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Paper>
      <PropertiesImageList images={images} propertyId={propertyId} />
    </Box>
  );
}
