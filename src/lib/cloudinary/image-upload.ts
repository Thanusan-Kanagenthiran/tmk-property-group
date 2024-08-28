import cloudinary from "./cloudinary";

export const uploadImageToCloudinary = async (image: File, folder: string) => {
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise(async (resolve, reject) => {
    await cloudinary.uploader
      .upload_stream(
        {
          folder: folder,
          resource_type: "image"
        },
        async (error, result) => {
          if (error) {
            reject(error.message);
            return;
          }
          resolve(result);
        }
      )
      .end(buffer);
  });
};
