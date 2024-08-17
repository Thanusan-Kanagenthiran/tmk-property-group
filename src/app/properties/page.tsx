// `page.tsx` or `page.ts` file

import PropertyCard from "@/components/Properties/PropertyCard";
import type { Property } from "@/interfaces/property";
import { Container, Grid } from "@mui/material";
import styles from "./home.module.scss";

async function getProperties(): Promise<Property[]> {
  try {
    const response = await fetch(`http://localhost:3000/api/properties`);
    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export default async function Page() {
  const properties = await getProperties();

  return (
    <Container className={styles.main} maxWidth="lg">
      <PropertyList properties={properties} />
    </Container>
  );
}

function PropertyList({ properties }: { properties: Property[] }) {
  if (properties.length === 0) {
    return <p>No properties available at the moment.</p>;
  }

  return (
    <Grid container spacing={{ xs: 2 }}>
      {properties.map((property: Property) => (
        <Grid item xs={12} sm={6} md={4} key={property._id} display="flex" justifyContent="center">
          <PropertyCard property={property} />
        </Grid>
      ))}
    </Grid>
  );
}
