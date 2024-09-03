import { Grid } from "@mui/material";
import PropertyCard, { PropertyDTO } from "./PropertyCard";

export default function PropertyList({ properties }: { properties: PropertyDTO[] }) {
  return (
    <Grid container spacing={{ xs: 2 }} alignItems="stretch">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </Grid>
  );
}
