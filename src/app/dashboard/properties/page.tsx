import { Button, Container, Grid } from "@mui/material";
import { propertiesService } from "@/services/properties.service";
import PropertyCard from "@/components/Properties/List/PropertyCard";

export default async function Page() {
  try {
    const properties = await propertiesService.GetProperties();

    if (!Array.isArray(properties) || properties.length === 0) {
      throw new Error("No properties found");
    }

    return (
      <Container>
      {/* Button section */}
      <Grid container spacing={2} alignItems="center" justifyContent="end" mb={3}>
        <Grid item>
          <Button variant="contained" href="/dashboard/add">
            Add Property
          </Button>
        </Grid>
      </Grid>

      {/* Property cards grid */}
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <PropertyCard property={property} isDashboard />
          </Grid>
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
