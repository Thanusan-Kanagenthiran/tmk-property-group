import { Grid } from "@mui/material";
import PropertyCard, { PropertyDTO } from "./PropertyCard";

export default function PropertyList({ properties }: { properties: PropertyDTO[] }) {
  return (
    <Grid container spacing={{ xs: 2 }}>
      {properties.map((property) => (
        <Grid item xs={12} sm={6} md={4} key={property.id} display="flex" justifyContent="center">
          <PropertyCard property={property} />
        </Grid>
      ))}
    </Grid>
  );
}
