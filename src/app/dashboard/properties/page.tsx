import { Button, Container } from "@mui/material";
import { propertiesService } from "@/services/properties.service";
import PropertyList from "@/components/Properties/List/PropertyList";

export default async function Page() {
  let propertiesTypes, properties;
  try {
    propertiesTypes = await propertiesService.GetPropertyTypes();
    properties = await propertiesService.GetProperties();
    console.log(propertiesTypes);
  } catch (error) {
    return <div>Error loading data</div>;
  }
  console.log(properties);
  return (
    <>
      <Button href="/dashboard/add">Add Property</Button>
      <PropertyList properties={properties} />
    </>
  );
}
