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

type FilterParams = {
  propertyType?: string;
  region?: string;
  checkIn?: string;
  checkOut?: string;
};

async function GetProperties(filters: FilterParams = {}): Promise<any> {
  try {
    // Convert filters object to query string
    const queryString = new URLSearchParams(filters as any).toString();
    
    // Append query string to the endpoint
    const endpoint = `/property?${queryString}`;
    
    // Make the API request
    const response = await axiosClient.get(endpoint);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw new Error("Failed to fetch properties.");
  }
}

async function AddProperty(propertyData: PropertyPostData): Promise<any> {
  try {
    const response = await axiosClient.post(endpoint, propertyData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function UpdateProperty(propertyData: PropertyPostData, id: string): Promise<any> {
  try {
    const response = await axiosClient.put(`${endpoint}/${id}`, propertyData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function GetPropertyTypes(): Promise<any> {
  try {
    const response = await axiosClient.get("/property-type");
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function GetSingleProperty(id: string): Promise<any> {
  try {
    const response = await axiosClient.get(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const propertiesService = {
  AddProperty,
  UpdateProperty,
  GetProperties,
  GetPropertyTypes,
  GetSingleProperty
};
