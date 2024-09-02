import { Button } from "@mui/material";
import { propertiesService } from "@/services/properties.service";
import PropertyList from "@/components/Properties/List/PropertyList";

export default async function Page() {
  try {
    const properties = await propertiesService.GetProperties();

    if (!Array.isArray(properties) || properties.length === 0) {
      throw new Error("No properties found");
    }

    return (
      <>
        <Button href="/dashboard/add">Add Property</Button>
        <PropertyList properties={properties} />
      </>
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
