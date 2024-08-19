import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import CldImage from "@/components/CldImage";
import ImageUploadField from "./ImageUploadField";
import { Grid, Box, Button, Typography } from "@mui/material";
import ImageDeleteButton from "./ImageDeleteButton";
import AddFormContainer from "../Common/Layout/AddFormContainer";
import type { CloudinaryResource } from "@/interfaces/Image";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

interface PropertiesImagesUploadProps {
  propertyId: string;
}

async function PropertiesImagesUpload({ propertyId }: PropertiesImagesUploadProps) {
  const { resources: images } = await cloudinary.api.resources_by_tag("66c381243d9694a4c059a504", {
    context: true
  });

  async function create(formData: FormData) {
    "use server";
    const file = formData.get("image") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { tags: ["66c381243d9694a4c059a504"], upload_preset: "tmk-property-group" },
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
    revalidatePath("/properties/add");
  }

  const count = images.length;
  return (
    <AddFormContainer>
      {count < 10 && (
        <Box maxWidth="lg">
          <h2>Add Images here</h2>
          <form action={create}>
            <Typography variant="body1" color="secondary" textAlign="left">
              Still you can upload up to {10 - count} images
            </Typography>
            <ImageUploadField name="image" id="image" />
            <Box sx={{ mt: -4, px: 4, display: "flex", justifyContent: "flex-end" }}>
              <Button size="small" color="secondary" type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
          <h2 className="text-xl font-bold mb-4">Images</h2>
        </Box>
      )}
      <Grid container spacing={2} py={2}>
        {images.map((image: CloudinaryResource) => (
          <Grid key={image.public_id} item xs={12} sm={6} md={4}>
            <Box
              style={{
                position: "relative",
                width: "100%",
                height: "auto",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center"
              }}>
              <CldImage
                src={image.public_id}
                alt=""
                width={300}
                height={200}
                style={{
                  width: "80%",
                  height: "100%"
                }}
                crop="fill"
                gravity="center"
              />
              <ImageDeleteButton id={image.public_id} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </AddFormContainer>
  );
}

export default PropertiesImagesUpload;
