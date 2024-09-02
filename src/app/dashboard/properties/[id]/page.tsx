import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Grid,
  Typography,
  Stack,
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
import Image from "next/image";
import { propertiesService } from "@/services/properties.service";
import { PropertyDocument } from "@/lib/db/models/Properties/Property";
import KingBedIcon from "@mui/icons-material/KingBed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import PeopleIcon from "@mui/icons-material/People";
import PropertiesImagesUpload from "@/components/Properties/Form/propertiesImagesUpload";
import PackageList from "./PackageList";

export const revalidate = 0;

export default async function Page({ params }: { params: { id: string } }) {
  let propertyDetails: PropertyDocument | null = null;

  try {
    propertyDetails = await propertiesService.GetSingleProperty(params.id);
  } catch (error) {
   
    return <div>Error loading data</div>;
  }

  if (!propertyDetails) {
    return <div>No property details available</div>;
  }

  const featureImage =
    Array.isArray(propertyDetails.images) && propertyDetails.images.length > 0
      ? propertyDetails.images[0].url
      : `https://placehold.co/1300x940?text=${encodeURIComponent(propertyDetails.title)}`;

  return (
    <>
      <Box>
        <Stack direction={{ xs: "column", sm: "row" }} sx={{ justifyContent: "space-between", alignItems: "end" }}>
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
              Price starts from per night
            </Typography>
            <Typography variant="h5" color="secondary" textAlign={"right"}>
              {propertyDetails.pricePerNight.toLocaleString("en-US", {
                style: "currency",
                currency: "LKR"
              })}
            </Typography>
          </Stack>
        </Stack>

        <Grid container spacing={2} sx={{ my: 2 }}>
          <Grid item xs={12} md={6}>
            <Box
              style={{
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

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {propertyDetails.description}
                </Typography>
              </CardContent>
            </Card>

            <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6} sm={4}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <KingBedIcon />
              <Typography variant="h6">{propertyDetails.noOfBeds}</Typography>
              <Typography variant="body2" color="text.secondary">Bed Rooms</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={4}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <BathtubIcon />
              <Typography variant="h6">{propertyDetails.noOfBaths}</Typography>
              <Typography variant="body2" color="text.secondary">Bath Rooms</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={4}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <PeopleIcon />
              <Typography variant="h6">{propertyDetails.maxNoOfGuests}</Typography>
              <Typography variant="body2" color="text.secondary">Max Guests</Typography>
            </CardContent>
          </Card>
        </Grid>
            </Grid>
            <Grid item xs={12} >
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Amenities
                </Typography>
                <List sx={{ fontSize: "small" }}>
                  {propertyDetails.amenities &&
                    propertyDetails.amenities.map((feature: string, index: number) => (
                      <ListItem sx={{ mb: 2 }} key={index}>
                        <ListItemIcon>
                          <StarBorderPurple500Icon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                </List>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 4 }}>
        <PropertiesImagesUpload propertyId={params.id} />
        <PackageList propertyId={params.id} />
      </Box>
    </>
  );
}
