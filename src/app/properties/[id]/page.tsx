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
import PropertyImagesList from "@/components/Properties/PropertyImagesList";

export const revalidate = 0;

async function getProperties(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/property/${id}`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  } catch (error: unknown) {
    console.error("Failed to fetch property details:", error);
    return null;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const propertyDetails = await getProperties(params.id);
  console.log(propertyDetails);

  if (propertyDetails === null) {
    return <div>Error fetching property details. Please try again later.</div>;
  }

  if (!propertyDetails) {
    return <div>Loading...</div>;
  }

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
              <Typography variant="body1">{propertyDetails.location}</Typography>
              <span>{propertyDetails.address}</span>
            </Button>
          </Stack>
          <Stack>
            {/* <Typography variant="subtitle1" color="text.secondary">
            Price
          </Typography> */}
            <Typography variant="h5" color="text.secondary">
              {propertyDetails.price}
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
              src={propertyDetails.featureImage}
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
        <Grid container alignItems={"baseline"} spacing={2}>
          <Grid item container md={8} xs={12} spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent
                  sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Description
                  </Typography>
                  <Typography variant="body2" px={2} color="text.secondary">
                    {propertyDetails.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card
                sx={{ maxWidth: 345, textAlign: "center", display: "flex", flexDirection: "column", height: "100%" }}>
                <CardActionArea sx={{ flex: 1 }}>
                  <Box height="100" pt={2}>
                    <HighlightAltIcon fontSize="small" />
                  </Box>
                  <CardContent
                    sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      Area
                    </Typography>
                    <Typography variant="body2" px={2} color="text.secondary">
                      {propertyDetails.area} sqft
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card
                sx={{ maxWidth: 345, textAlign: "center", display: "flex", flexDirection: "column", height: "100%" }}>
                <CardActionArea sx={{ flex: 1 }}>
                  <Box height="100" pt={2}>
                    <HighlightAltIcon fontSize="small" />
                  </Box>
                  <CardContent
                    sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      Area
                    </Typography>
                    <Typography variant="body2" px={2} color="text.secondary">
                      {propertyDetails.area} sqft
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card
                sx={{ maxWidth: 345, textAlign: "center", display: "flex", flexDirection: "column", height: "100%" }}>
                <CardActionArea sx={{ flex: 1 }}>
                  <Box height="100" pt={2}>
                    <HighlightAltIcon fontSize="small" />
                  </Box>
                  <CardContent
                    sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      Area
                    </Typography>
                    <Typography variant="body2" px={2} color="text.secondary">
                      {propertyDetails.area} sqft
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card
                sx={{ maxWidth: 345, textAlign: "center", display: "flex", flexDirection: "column", height: "100%" }}>
                <CardActionArea sx={{ flex: 1 }}>
                  <Box height="100" pt={2}>
                    <HighlightAltIcon fontSize="small" />
                  </Box>
                  <CardContent
                    sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      Area
                    </Typography>
                    <Typography variant="body2" px={2} color="text.secondary">
                      {propertyDetails.area} sqft
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
          <Grid item md={4} xs={12} spacing={2} sx={{ height: "100%" }}>
            <Box
              sx={{
                p: 1,
                borderRadius: 0,
                bgcolor: "background.default",
                display: "grid",
                gap: 2,
                height: "100%"
              }}>
              <List sx={{ fontSize: "small" }}>
                <Typography sx={{ fontWeight: 600, pl: 2 }} variant="h6">
                  Key Features and Amenities
                </Typography>
                {propertyDetails.amenities &&
                  propertyDetails.amenities.map((feature: string, index: number) => (
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
        <PropertyImagesList tag={propertyDetails.id} />
      </AddFormContainer>
    </Container>
  );
}
