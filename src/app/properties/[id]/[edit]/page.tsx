import PropertiesForm from "@/components/Properties/Form/PropertiesForm";
import { propertiesService, PropertyPostData } from "@/services/properties.service";
export default async function Page({ params }: { params: { id: string } }) {
  let propertyDetails: PropertyPostData | null = null;
  console.log("Property ID:", params.id);
  let error: string | null = null;
  try {
    propertyDetails = await propertiesService.GetSingleProperty(params.id);

    if (!propertyDetails) {
      // Optionally, you can use Next.js's built-in error handling for not found
    }
  } catch (err) {
    console.error("Error fetching property details:", err);
    error = "Error fetching property details. Please try again later.";
  }

  // Handle cases where there is an error or no property found
  if (error) {
    return <div>{error}</div>;
  }

  if (!propertyDetails) {
    // In case notFound() was not used
    return <div>Property not found</div>;
  }
  return <PropertiesForm id={params.id} editData={propertyDetails} />;
}
