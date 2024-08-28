import cloudinary from "./cloudinary";
import { UploadApiResponse } from "cloudinary";

export async function deleteImageFromCloudinary(public_id: string): Promise<UploadApiResponse> {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return result as UploadApiResponse;
  } catch (error: any) {
    throw new Error(error.message as string);
  }
}
