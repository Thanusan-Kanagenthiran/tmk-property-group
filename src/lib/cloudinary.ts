import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;

const userImagePreset = "user_images";
const propertyImagePreset = "property_images";

export const CLODINARY_IMAGE_PRESETS = {
  USER_IMAGE_PRESET: userImagePreset,
  PROPERTY_IMAGE_PRESET: propertyImagePreset
};
