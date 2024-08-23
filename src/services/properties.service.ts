import axiosClient from ".";

export interface PropertyPostData {
  propertyType: string;
  pricePerNight: number;
  title: string;
  description: string;
  region: string;
  address: string;
  maxNoOfGuests: number;
  noOfBeds: number;
  noOfBaths: number;
  amenities: string[];
}

const endpoint = "/property";
async function AddProperty(propertyData: PropertyPostData): Promise<any> {
  try {
    const response = await axiosClient.post(endpoint, propertyData);
    return response.data;
  } catch (error) {
    console.error("Error posting property data:", error);
    throw error;
  }
}

async function UpdateProperty(propertyData: PropertyPostData, id: string): Promise<any> {
  try {
    const response = await axiosClient.put(`${endpoint}/${id}`, propertyData);
    return response.data;
  } catch (error) {
    console.error("Error updating property data:", error);
    throw error;
  }
}

export const propertiesService = {
  AddProperty,
  UpdateProperty
};
