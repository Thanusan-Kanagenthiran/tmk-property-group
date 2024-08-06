import { Container, Grid } from "@mui/material";
import styles from "./home.module.scss";
import PropertyCard from "@/components/Common/PropertyCard";
import { PackageType, type Property } from "@/interfaces/property";


export default async function Home() {
  const properties: Property[] = [
    {
      id: '66b288b59ff13023fb19b2f5',
      title: 'Modern Family Home',
      description: 'A spacious and modern family home with a large backyard and open floor plan.',
      bedrooms: 4,
      bathrooms: 3,
      price: '$750,000',
      link: 'https://example.com/properties/home1',
      packageType: PackageType.Premium,
      location: 'New York, NY',
     // Expires in 30 days
      area: '2,500 sq ft',
      keyFeaturesAndAmenities: ['Large Backyard', 'Open Floor Plan', 'Modern Kitchen'],
      images: ['/property1.png', '/property2.png'],
    },
    {
      id: '83b8c8c1a5f22928eb33b3a9',
      title: 'Cozy Cottage',
      description: 'A charming cottage perfect for a small family or a cozy retreat.',
      bedrooms: 2,
      bathrooms: 1,
      price: '$350,000',
      link: 'https://example.com/properties/cottage1',
      packageType: PackageType.Standard,
      location: 'Los Angeles, CA',
      area: '1,200 sq ft',
      keyFeaturesAndAmenities: ['Charming Design', 'Close to Downtown'],
      images: ['/property2.png', '/property3.png'],
    },
    {
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
  ];

  return (
    <Container className={styles.main} maxWidth="lg">
      <h2>Featured Properties</h2>
      <p>
        Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes
        and investments available through Estatein. Click <q>View Details</q> for more information.
      </p>

      <Grid container spacing={{ xs: 2 }}>
        {properties.map((property: Property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id} justifyContent={"center"}>
            <PropertyCard property={property} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
