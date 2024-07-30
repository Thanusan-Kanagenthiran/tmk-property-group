import { Container, Grid } from "@mui/material";
import styles from "./home.module.scss";
import PropertyCard from "@/components/Common/PropertyCard";

const properties = [
  {
    id: "1",
    title: "Modern Family Home",
    image: "/property1.png",
    description: "A spacious and modern family home with a large backyard and open floor plan.",
    bedrooms: 4,
    bathrooms: 3,
    price: "$750,000",
    link: "https://example.com/properties/home1",
  },
  {
    id: "2",
    title: "Charming Cottage",
    image: "/property2.png",
    description: "A cozy and charming cottage located in a quiet neighborhood.",
    bedrooms: 2,
    bathrooms: 1,
    price: "$320,000",
    link: "https://example.com/properties/home2",
  },
  {
    id: "3",
    title: "Luxurious Penthouse",
    image: "/property3.png",
    description: "An upscale penthouse with stunning city views and high-end finishes.",
    bedrooms: 3,
    bathrooms: 2,
    price: "$1,500,000",
    link: "https://example.com/properties/home3",
  },
  {
    id: "4",
    title: "Countryside Villa",
    image: "/property1.png",
    description: "A beautiful villa in the countryside with expansive grounds and a private pool.",
    bedrooms: 5,
    bathrooms: 4,
    price: "$900,000",
    link: "https://example.com/properties/home4",
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <Container maxWidth="lg">
        <h2>Featured Properties</h2>
        <p>
          Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes
          and investments available through Estatein. Click <q>View Details</q> for more information.
        </p>
        <Grid container spacing={{ xs: 2 }}>
          {properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id} justifyContent={"center"}>
              <PropertyCard property={property} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
