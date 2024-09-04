import axiosClient from ".";

async function getBookings(): Promise<any> {
  try {
    const response = await axiosClient.get("/property/bookings");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const bookingServices = {
  getBookings
};
