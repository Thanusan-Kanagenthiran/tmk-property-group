import axiosClient from ".";

async function getBookings(): Promise<any> {
  try {
    const response = await axiosClient.get("/property/bookings");
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function rejectBooking(id: string): Promise<any> {
  try {
    const response = await axiosClient.get(`/bookings/approve-or-reject/${id}?action=reject`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function approveBooking(id: string): Promise<any> {
  try {
    const response = await axiosClient.get(`/bookings/approve-or-reject/${id}?action=approve`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function cancelBooking(id: string): Promise<any> {
  try {
    const response = await axiosClient.get(`/bookings/cancel-booking/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const bookingServices = {
  getBookings,
  rejectBooking,
  approveBooking,
  cancelBooking
};
