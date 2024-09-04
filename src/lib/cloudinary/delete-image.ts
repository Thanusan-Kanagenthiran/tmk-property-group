import cloudinary from "./cloudinary";
import { UploadApiResponse } from "cloudinary";

export async function deleteImageFromCloudinary(public_id: string): Promise<UploadApiResponse> {
  console.log(`Attempting to delete image with public ID: ${public_id}`);
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    console.log(`Delete result: ${JSON.stringify(result)}`);
    return result as UploadApiResponse;
  } catch (error: any) {
    console.error(`Error deleting image from Cloudinary: ${error.message}`);
    throw new Error(error.message as string);
  }
}
