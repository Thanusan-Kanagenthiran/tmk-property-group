"use client";
import CldImage from "@/components/CldImage";
import Button from "@/components/Button";
import { Box } from "@mui/material";
import type { CloudinaryResource } from "@/interfaces/Image";

interface ImageListProps {
  images: CloudinaryResource[];
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

function ImageList({ images }: ImageListProps) {
  return (
    <ul className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
      {images.map((sneaker: CloudinaryResource) => (
        <li key={sneaker.public_id} className="rounded overflow-hidden bg-white dark:bg-slate-700">
          <Box className="relative" width={200} height={200}>
            <CldImage src={sneaker.public_id} alt="" width="100" height="200" crop="fill" gravity="center" />
            <Button
              onClick={() => {
                deleteImage(sneaker.public_id);
              }}>
              Delete
            </Button>
          </Box>
        </li>
      ))}
    </ul>
  );
}

export default ImageList;
