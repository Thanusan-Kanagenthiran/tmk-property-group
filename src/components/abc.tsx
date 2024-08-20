"use client";

import Image from "next/image";
import axios from "axios";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

const ABC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
      if (!image) {
        return alert("Please select an image first");
      }

      const formData = new FormData();
      formData.append("image", image);

      await axios.post("/api/abc", formData);
      alert("Image uploaded successfully");

      // Clear form
      setImage(null);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle image update
  const onUpdateHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedImageId || !image) {
      return alert("Please select an image and an image to update");
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("image", image);

      await axios.put(`/api/abc/${selectedImageId}`, formData);
      alert("Image updated successfully");

      // Clear form
      setImage(null);
      setSelectedImageId(null);
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
      // Optionally, refetch images here to update the list
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
        <input disabled={submitting} type="file" name="image" onChange={onChange} />
        <button type="submit">{submitting ? "Uploading..." : "Upload Image"}</button>
      </form>

      {/* Update Existing Image Form */}
      {selectedImageId && (
        <form onSubmit={onUpdateHandler}>
          <h2>Update Selected Image</h2>
          <input disabled={submitting} type="file" name="image" onChange={onChange} />
          <button type="submit">{submitting ? "Updating..." : "Update Image"}</button>
        </form>
      )}

      {/* Display Images */}
      {loadingImages ? (
        <p>Loading...</p>
      ) : images.length > 0 ? (
        images.map((image) => (
          <div key={image.id}>
            <Image width={300} height={300} alt="" src={image.image_url} />
            <button onClick={() => handleEditClick(image.id)}>Edit</button>
            <button onClick={() => onDelete(image.id)}>{loading ? "Deleting..." : "Delete"}</button>
          </div>
        ))
      ) : (
        <p>No images</p>
      )}
    </div>
  );
};

export default ABC;
