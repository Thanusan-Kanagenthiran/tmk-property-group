import { Button, Container, Grid } from "@mui/material";
import { propertiesService } from "@/services/properties.service";
import PropertyCard from "@/components/Properties/List/PropertyCard";

export default async function Page() {
  try {
    const data = await propertiesService.GetProperties();

    if (!Array.isArray(data.properties) || data.properties.length === 0) {
      throw new Error("No properties found");
    }

    return (
      <Container>
        <Grid container spacing={2} alignItems="center" justifyContent="end" mb={3}>
          <Grid item>
            <Button variant="contained" href="/dashboard/add">
              Add Property
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {data.properties.map((property: any) => (
            <PropertyCard key={property._id} property={property} isDashboard />
          ))}
        </Grid>
      </Container>
    );
  } catch (error: any) {
    return (
      <>
        <Button href="/dashboard/add">Add Property</Button>
        <div>{error.message || "Error loading data"}</div>
      </>
    );
  }
}
