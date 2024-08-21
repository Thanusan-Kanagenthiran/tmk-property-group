import CldImage from "@/components/CldImage";
import { Box, Grid } from "@mui/material";
import { fetchPropertiesAllByImages } from "@/actions/users/images";
import type { CloudinaryResource } from "@/interfaces/Image";

interface PropertyImagesListProps {
  tag: string;
}

async function PropertyImagesList({ tag }: PropertyImagesListProps) {
  const images = await fetchPropertiesAllByImages(tag);
  return (
    <ul className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
      <Grid container spacing={2} py={2}>
        {images &&
          images.map((image: CloudinaryResource) => (
            <Grid key={image.public_id} item xs={12} sm={6} md={4}>
              <Box key={image.public_id} className="relative" width={"100%"} height={"100%"}>
                <CldImage src={image.public_id} alt="" width={300} height={200} crop="fill" gravity="center" />
              </Box>
            </Grid>
          ))}
      </Grid>
    </ul>
  );
}

export default PropertyImagesList;
