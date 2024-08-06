import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Grid,
  Typography,
  Stack,
  Container,
  Box,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import KingBedIcon from "@mui/icons-material/KingBed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
import PropertyImagesCarousal from "@/components/Common/PropertyImagesCarousal";
import { PackageType } from "@/interfaces/property";

const page = async ({ params }: { params: { id: string } }) => {

  const propertyDetails =  {
    id: '9cc7d5d8b4e347a2a5e1d2c0',
    title: 'Luxury Penthouse',
    description: 'An upscale penthouse with panoramic city views and high-end finishes.',
    bedrooms: 3,
    bathrooms: 4,
    price: '$1,500,000',
    link: 'https://example.com/properties/penthouse1',
    packageType: PackageType.Basic,
    location: 'San Francisco, CA',
    area: '3,000 sq ft',
    keyFeaturesAndAmenities: ['Panoramic Views', 'High-End Finishes', 'Private Elevator'],
    images: ['/property3.png', '/property4.png'],
  }

  return (
    <Container maxWidth="lg">
      <Stack mt={5} direction="row" sx={{ justifyContent: "space-between", alignItems: "end" }}>
        <Stack>
          <Typography variant="h5" color="text.secondary">
            {propertyDetails.title}
          </Typography>
          <Stack
            sx={{ borderRadius: 4, border: "1px solid #ccc" }}
            alignItems="center"
            direction="row"
            gap={1}
            width={"fit-content"}
            px={2}
            py={0.5}>
            <LocationOnIcon fontSize="small" />
            <Typography variant="body1">{propertyDetails.location}</Typography>
          </Stack>
        </Stack>
        <Stack>
          <Typography variant="subtitle1" color="text.secondary">
            Price
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {propertyDetails.price}
          </Typography>
        </Stack>
      </Stack>

      <PropertyImagesCarousal />

      <Grid container alignItems={"baseline"}>
        <Grid item container md={6} xs={12} spacing={2}>
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ p: 2, borderRadius: 0.5 }}>
              <Stack alignItems="center" direction="row" gap={1} py={0.5}>
                <Typography variant="body1">Description</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {propertyDetails.description}
              </Typography>
            </Card>
          </Grid>{" "}
          <Grid item xs={12} sm={4}>
            <Card variant="outlined" sx={{ p: 2, borderRadius: 0.5 }}>
              <Stack alignItems="center" justifyContent="center" direction="row" gap={1} py={0.5}>
                <HighlightAltIcon fontSize="small" />
                <Typography variant="body1">Area</Typography>
              </Stack>
              <Typography textAlign="center" variant="h6" color="text.secondary">
                12,000 SQ FT
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card variant="outlined" sx={{ p: 2, borderRadius: 0.5 }}>
              <Stack alignItems="center" justifyContent="center" direction="row" gap={1} py={0.5}>
                <KingBedIcon fontSize="small" />
                <Typography variant="body1">Bedrooms</Typography>
              </Stack>
              <Typography textAlign={"center"} variant="h5" color="text.secondary">
                05
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card variant="outlined" sx={{ p: 2, borderRadius: 0.5 }}>
              <Stack alignItems="center" justifyContent="center" direction="row" gap={1} py={0.5}>
                <BathtubIcon fontSize="small" />
                <Typography variant="body1">Bathrooms</Typography>
              </Stack>
              <Typography textAlign={"center"} variant="h5" color="text.secondary">
                05
              </Typography>
            </Card>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12} spacing={2}>
          <Box
            sx={{
              p: 1,
              borderRadius: 0,
              bgcolor: "background.default",
              display: "grid",
              gap: 2,
            }}>
            <List sx={{ fontSize: "small" }}>
              <Typography sx={{ fontWeight: 600, pl: 2 }} variant="h6">
                Key Features and Amenities
              </Typography>
              {propertyDetails.keyFeaturesAndAmenities &&
                propertyDetails.keyFeaturesAndAmenities.map((feature: string, index: number) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <StarBorderPurple500Icon />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default page;
