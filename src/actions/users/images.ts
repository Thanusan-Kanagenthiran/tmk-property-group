import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function deleteImageFromCloudinary(public_id: string) {
  try {
    // Call Cloudinary API to delete the image
    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result !== "ok") {
      throw new Error("Failed to delete image");
    }

    return { message: "Image deleted successfully" };
  } catch (error: unknown) {
    // Type guard for the error to handle it properly
    if (error instanceof Error) {
      console.error("Error deleting image from Cloudinary:", error.message);
      return { error: error.message };
    } else {
      console.error("Unexpected error:", error);
      return { error: "An unexpected error occurred" };
    }
  }
}
