import axiosClient from ".";
 

const endpoint = "/profile";

async function GetAccountDetails(): Promise<any> {
  try {
    const response = await axiosClient.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const accountServices = {
  GetAccountDetails
};