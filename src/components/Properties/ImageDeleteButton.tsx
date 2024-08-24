"use client";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

interface ImageDeleteButtonProps {
  id: string;
}

async function deleteImage(public_id: string) {
  try {
    const response = await fetch("/api/images", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ public_id })
    });

    if (!response.ok) {
      throw new Error("Failed to delete image");
    }
    window.location.reload();
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}

const ImageDeleteButton: React.FC<ImageDeleteButtonProps> = ({ id }) => {
  return (
    <IconButton
      size="large"
      color="error"
      sx={{
        position: "absolute",
        top: "5px",
        right: "10%"
      }}
      onClick={async () => {
        await deleteImage(id);
        window.location.reload();
      }}>
      <DeleteIcon fontSize="inherit" />
    </IconButton>
  );
};

export default ImageDeleteButton;
