"use client";
import { bookingServices } from "@/services/bookings.service";
import {
  Container,
  Grid,
  CircularProgress,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import BookingCard from "./BookingCard";
import React, { useEffect, useState } from "react";
import { accountServices } from "@/services/users.service";

export interface BookingDTO {
  id: string;
  amount: number;
  status: string;
  checkIn: string;
  checkOut: string;
  property: string;
  region: string;
}

export default function BookingList() {
  const [accountDetails, setAccountDetails] = React.useState<any | null>(null);
  const [bookings, setBookings] = useState<BookingDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  async function fetchBookings() {
    try {
      setLoading(true);
      const data = await bookingServices.getBookings();
      setBookings(data.bookings);
    } catch (err) {
      setError("Failed to fetch bookings. Please try again later.");
    } finally {
      setLoading(false);
    }
  }
  async function fetchUserRole() {
    try {
      const userData = await accountServices.GetAccountDetails();
      setAccountDetails(userData.role);
      console.log(userData.role);
    } catch (err: unknown) {
      setError("An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBookings();
    fetchUserRole();
  }, []);

  const handleMessage = (msg: string) => {
    setMessage(msg);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
        <Typography>Loading bookings...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  const handleStatusChange = () => {
    fetchBookings();
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Grid item xs={12} key={booking.id}>
              <BookingCard
                booking={booking}
                onStatusChange={handleStatusChange}
                userRole={accountDetails}
                onMessage={handleMessage}
              />
            </Grid>
          ))
        ) : (
          <Typography>No bookings found.</Typography>
        )}
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="info">
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
