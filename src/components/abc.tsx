"use client";

import Image from "next/image";
import axios from "axios";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";
import AppSpinner from "./Common/AppSpinner";

const ABC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState<string>("");

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "name") {
      setName(value);
    } else if (name === "image") {
      if (files) {
        setImage(files[0]);
      }
    }
  };

  // Handle file input change
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  // Handle new image upload
  const onUploadHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (!image || !name) {
        return alert("Please select an image and provide a name");
      }

      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name); // Add name to form data

      await axios.post("/api/abc", formData);
      alert("Image uploaded successfully");

      // Clear form
      setImage(null);
      setName("");
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  const onUpdateHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedImageId || !image || !name) {
      return alert("Please select an image, provide a name, and select an image to update");
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name); // Add name to form data

      await axios.put(`/api/abc/${selectedImageId}`, formData);
      alert("Image updated successfully");

      // Clear form
      setImage(null);
      setSelectedImageId(null);
      setName("");
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Fetch all images
  const fetchAllImages = async () => {
    setLoadingImages(true);
    try {
      const response = await axios.get("/api/abc");
      const data = await response.data;
      setImages(data.data);
      console.log(data.data);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoadingImages(false);
    }
  };

  useEffect(() => {
    fetchAllImages();
  }, [submitting]);

  // Handle image deletion
  const onDelete = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.delete(`/api/abc/${id}`);
      const data = await response.data;
      console.log(data.message);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle selecting an image for update
  const handleEditClick = (imageId: string) => {
    setSelectedImageId(imageId);
    // Optionally, you can fetch the image details here if needed
  };

  return (
    <div>
      {/* Upload New Image Form */}
      <form onSubmit={onUploadHandler}>
        <h2>Upload New Image</h2>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onInputChange}
          placeholder="Enter image name"
          disabled={submitting}
        />
        <input type="file" name="image" onChange={onInputChange} disabled={submitting} />
        <button type="submit" disabled={submitting}>
          {submitting ? "Uploading..." : "Upload Image"}
        </button>
      </form>

      {selectedImageId && (
        <form onSubmit={onUpdateHandler}>
          <h2>Update Selected Image</h2>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onInputChange}
            placeholder="Enter new image name"
            disabled={submitting}
          />
          <input type="file" name="image" onChange={onInputChange} disabled={submitting} />
          <button type="submit" disabled={submitting}>
            {submitting ? "Updating..." : "Update Image"}
          </button>
        </form>
      )}

      {/* Display Images */}
      {loadingImages ? (
        <p>Loading...</p>
      ) : images.length > 0 ? (
        <Grid container spacing={2} py={2} maxWidth={"lg"} sx={{ mx: "auto" }}>
          {images.map((image) => (
            <Grid key={image.id} item xs={12} sm={6} md={4}>
              <Box
                style={{
                  position: "relative",
                  width: "100%",
                  height: "auto",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center"
                }}>
                <Box sx={{ height: "100%", width: "300px", overflow: "hidden" }}>
                  <Image
                    style={{ borderRadius: 10 }}
                    width={300}
                    objectFit="fill"
                    height={300}
                    alt=""
                    src={image.image.url}
                    loading="lazy"
                  />
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    top: "5px",
                    right: "20%"
                  }}>
                  <IconButton size="small" onClick={() => onDelete(image.id)}>
                    {loading ? <AppSpinner size={14} /> : <DeleteIcon color="error" fontSize="small" />}
                  </IconButton>
                  <IconButton size="small" onClick={() => handleEditClick(image.id)}>
                    <EditIcon color="primary" fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No images</p>
      )}
    </div>
  );
};

export default ABC;
