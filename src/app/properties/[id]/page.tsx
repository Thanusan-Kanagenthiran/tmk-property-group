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
  Button,
  CardActionArea,
  CardContent
} from "@mui/material";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
import AddFormContainer from "@/components/Common/Layout/AddFormContainer";
import Image from "next/image";
import { propertiesService } from "@/services/properties.service";
import { PropertyDocument } from "@/lib/db/models/Properties/Property";
import KingBedIcon from "@mui/icons-material/KingBed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import PeopleIcon from "@mui/icons-material/People";
export const revalidate = 0;

export default async function Page({ params }: { params: { id: string } }) {
  let propertyDetails: PropertyDocument | null = null;
  let error: string | null = null;

  try {
    propertyDetails = await propertiesService.GetSingleProperty(params.id);

    if (!propertyDetails) {
      // Optionally, you can use Next.js's built-in error handling for not found
      ("fgmd");
    }
  } catch (err) {
    console.error("Error fetching property details:", err);
    error = "Error fetching property details. Please try again later.";
  }

  // Handle cases where there is an error or no property found
  if (error) {
    return <div>{error}</div>;
  }

  if (!propertyDetails) {
    // In case notFound() was not used
    return <div>Property not found</div>;
  }

  const featureImage =
    Array.isArray(propertyDetails.images) && propertyDetails.images.length > 0
      ? propertyDetails.images[0].url
      : `https://placehold.co/1300x940?text=${encodeURIComponent(propertyDetails.title)}`;

  return (
    <Container maxWidth="lg">
      <AddFormContainer>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "end", my: 2 }}>
          <Stack>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {propertyDetails.title}
            </Typography>
            <Button
              color="secondary"
              variant="outlined"
              startIcon={<LocationOnIcon fontSize="small" color="secondary" />}>
              <Typography sx={{ mr: 1 }} variant="body1">
                {propertyDetails.region}
              </Typography>
              <span>{propertyDetails.address}</span>
            </Button>
          </Stack>
          <Stack>
            <Typography variant="subtitle1" color="text.secondary">
              Price per night starts from
            </Typography>
            <Typography variant="h5" color="secondary" textAlign={"right"}>
              {propertyDetails.pricePerNight}
            </Typography>
          </Stack>
        </Stack>
        <Grid sx={{ my: 2 }}>
          <Box
            style={{
              position: "relative",
              width: "100%",
              height: "auto",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center"
            }}>
            <Image
              loading="lazy"
              src={featureImage}
              alt=""
              width={1000}
              height={450}
              style={{
                width: "100%",
                height: "100%"
              }}
            />
          </Box>
        </Grid>
        <Grid container spacing={2}>
          <Grid item container md={8} xs={12} spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent
                  sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <Typography variant="body2" px={2} color="text.secondary">
                    {propertyDetails.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Card
                sx={{ maxWidth: 345, textAlign: "center", display: "flex", flexDirection: "column", height: "100%" }}>
                <CardActionArea sx={{ flex: 1 }}>
                  <Box height="100" pt={2}>
                    <KingBedIcon />
                  </Box>
                  <CardContent
                    sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {propertyDetails.noOfBeds}
                    </Typography>
                    <Typography variant="body2" px={2} color="text.secondary">
                      Bed Rooms <br />
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Card
                sx={{ maxWidth: 345, textAlign: "center", display: "flex", flexDirection: "column", height: "100%" }}>
                <CardActionArea sx={{ flex: 1 }}>
                  <Box height="100" pt={2}>
                    <BathtubIcon />
                  </Box>
                  <CardContent
                    sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {propertyDetails.noOfBaths}
                    </Typography>
                    <Typography variant="body2" px={2} color="text.secondary">
                      Bath Rooms
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Card
                sx={{ maxWidth: 345, textAlign: "center", display: "flex", flexDirection: "column", height: "100%" }}>
                <CardActionArea sx={{ flex: 1 }}>
                  <Box height="100" pt={2}>
                    <PeopleIcon />
                  </Box>
                  <CardContent
                    sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {propertyDetails.maxNoOfGuests}
                    </Typography>
                    <Typography variant="body2" px={2} color="text.secondary">
                      Max Guests
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
          <Grid item md={4} xs={12} spacing={2}>
            <Grid
              sx={{
                p: 2,
                borderRadius: 0,
                bgcolor: "background.default",
                display: "grid",
                gap: 2,
                height: "100%"
              }}>
              <List sx={{ fontSize: "small" }}>
                {propertyDetails.amenities &&
                  propertyDetails.amenities.map((feature: string, index: number) => (
                    <ListItem sx={{ mb: 2, border: "1px solid white " }} key={index}>
                      <ListItemIcon>
                        <StarBorderPurple500Icon color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
              </List>
            </Grid>
          </Grid>
        </Grid>
      </AddFormContainer>
    </Container>
  );
}
