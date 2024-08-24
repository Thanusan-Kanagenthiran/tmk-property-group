import { Container } from "@mui/material";
import styles from "./home.module.scss";
import { propertiesService } from "@/services/properties.service";
import PropertyList from "@/components/Properties/List/PropertyList";

export default async function Page() {
  const propertiesTypes = await propertiesService.GetPropertyTypes();
  const properties = await propertiesService.GetProperties();
  console.log(properties);
  return (
    <Container className={styles.main} maxWidth="lg">
      <PropertyList properties={properties} />
    </Container>
  );
}
