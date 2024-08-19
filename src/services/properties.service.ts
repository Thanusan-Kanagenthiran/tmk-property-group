import axiosClient from ".";

interface PropertyPostData {
  packageType: string;
  propertyType: string;

  title: string;
  description: string;
  location: string;
  address: string;

  noOfRooms: string;
  noOfBeds: string;
  noOfBaths: string;
  area: string;

  amenities: string[];
}

async function AddProperty(propertyData: PropertyPostData, endpoint: string): Promise<any> {
  try {
    const response = await axiosClient.post(endpoint, propertyData);
    return response.data;
  } catch (error) {
    console.error("Error posting property data:", error);
    throw error;
  }
}

export const propertiesService = {
  AddProperty
};
