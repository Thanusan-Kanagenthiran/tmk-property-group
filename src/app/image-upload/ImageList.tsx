"use client";
import CldImage from "@/components/CldImage";
import Button from "@/components/Button";
import { Box } from "@mui/material";

interface CloudinaryResource {
  context?: {
    alt?: string;
    caption?: string;
  };
  public_id: string;
  secure_url: string;
}

interface ImageListProps {
  sneakers: CloudinaryResource[];
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

    // Refresh the page or refetch images
    window.location.reload();
  } catch (error) {
    console.error("Error deleting image:", error);
    // Handle error (e.g., show message to user)
  }
}

function ImageList({ sneakers }: ImageListProps) {
  return (
    <ul className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
      {sneakers.map((sneaker: CloudinaryResource) => (
        <li key={sneaker.public_id} className="rounded overflow-hidden bg-white dark:bg-slate-700">
          <Box className="relative" width={200} height={200}>
            <CldImage
              src={sneaker.public_id}
              alt={sneaker.context?.alt || ""}
              width="100"
              height="200"
              crop="fill"
              gravity="center"
            />
            <Button
              onClick={() => {
                deleteImage(sneaker.public_id);
              }}>
              Delete
            </Button>
          </Box>
          {sneaker.context?.caption && (
            <div className="py-4 px-5">
              <p className="mb-1 text-md font-bold leading-tight text-neutral-800 dark:text-neutral-50">
                {sneaker.context?.caption || ""}
              </p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ImageList;
