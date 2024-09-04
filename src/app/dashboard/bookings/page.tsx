"use client";
import { bookingServices } from "@/services/Bookings.service";
import { Container, Grid, CircularProgress, Typography } from "@mui/material";
import BookingCard from "./Booking";
import React, { useEffect, useState } from "react";

export interface BookingDTO {
  id: string;
  amount: number;
  status: string;
  checkIn: string;
  checkOut: string;
  property: string;
  region: string;
}

export default function Page() {
  const [bookings, setBookings] = useState<BookingDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        setLoading(true);
        const data = await bookingServices.getBookings();
        console.log(data);
        setBookings(data.bookings);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        setError("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

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

  return (
    <Container>
      <Grid container spacing={2}>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Grid item xs={12} key={booking.id}>
              <BookingCard booking={booking} />
            </Grid>
          ))
        ) : (
          <Typography>No bookings found.</Typography>
        )}
      </Grid>
    </Container>
  );
}
