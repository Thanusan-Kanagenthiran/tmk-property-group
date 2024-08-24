import { Container } from "@mui/material";
import styles from "./home.module.scss";
import { propertiesService } from "@/services/properties.service";
import PropertyList from "@/components/Properties/List/PropertyList";

export default async function Page() {
  let propertiesTypes, properties;
  try {
    propertiesTypes = await propertiesService.GetPropertyTypes();
    properties = await propertiesService.GetProperties();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    // Handle error or return a fallback UI
    return <div>Error loading data</div>;
  }
  console.log(properties);
  return (
    <Container className={styles.main} maxWidth="lg">
      <PropertyList properties={properties} />
    </Container>
  );
}
