import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function deleteImageFromCloudinary(public_id: string) {
  try {
    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result !== "ok") {
      throw new Error("Failed to delete image");
    }
    return { message: "Image deleted successfully" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting image from Cloudinary:", error.message);
      return { error: error.message };
    } else {
      console.error("Unexpected error:", error);
      return { error: "An unexpected error occurred" };
    }
  }
}

export async function uploadImage(formData: FormData) {
  "use server";
  try {
    const file = formData.get("image") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log(buffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            tags: ["thanusan"],
            upload_preset: "tmk-property-group"
          },
          function (error, result) {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          }
        )
        .end(buffer);
    });

    console.log(result);
    window.location.reload();
  } catch (error) {
    console.error("Error uploading image:", error);
  }
}

export async function fetchPropertiesAllByImages(id: string): Promise<any[]> {
  try {
    const { resources } = await cloudinary.api.resources_by_tag(id, {
      context: true
    });

    return resources;
  } catch (error) {
    console.error("Error fetching resources from Source:", error);
    throw new Error("Failed to fetch resources from Source");
  }
}


