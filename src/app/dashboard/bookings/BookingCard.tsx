"use client";
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { formatCurrency } from "@/lib/util/formatCurrency";
import { BookingDTO } from "./BookingList";
import { Chip } from "@mui/material";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { bookingServices } from "@/services/bookings.service";
import PreviewIcon from "@mui/icons-material/Preview";

interface BookingProps {
  booking: BookingDTO;
  onStatusChange: () => void;
  onMessage: (message: string) => void;
  userRole: string;
}

export default function BookingCard({
  booking,
  onStatusChange,
  onMessage,
  userRole,
}: BookingProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  console.log(userRole);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCancelBooking = async () => {
    try {
      await bookingServices.cancelBooking(booking.id);
      onStatusChange();
      handleMenuClose();
    } catch (err) {
      onMessage("Failed to cancel booking.");
    } finally {
      handleMenuClose();
    }
  };

  const handleApproveBooking = async () => {
    try {
      await bookingServices.approveBooking(booking.id);
      onMessage("Booking approved successfully!"); // Trigger message
      onStatusChange();
    } catch (err) {
      onMessage("Failed to approve booking.");
    } finally {
      handleMenuClose();
    }
  };

  const handleRejectBooking = async () => {
    try {
      await bookingServices.rejectBooking(booking.id);
      onMessage("Booking rejected successfully!"); // Trigger message
      onStatusChange();
    } catch (err) {
      onMessage("Failed to reject booking.");
    } finally {
      handleMenuClose();
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: { xs: "center", md: "space-between" },
        px: 2,
        position: "relative",
      }}
    >
      <IconButton
        sx={{ position: "absolute", top: 8, right: 8 }}
        aria-controls={open ? "booking-menu" : undefined}
        aria-haspopup="true"
        onClick={handleMenuClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        sx={{
          "& .MuiMenu-paper": {
            p: 1,
          },
        }}
        id="booking-menu"
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleMenuClose}
      >
        {booking.status === "pending" && userRole === "host" && (
          <>
            <Button
              color="secondary"
              variant="outlined"
              startIcon={<CheckCircleOutlineIcon />}
              fullWidth
              size="small"
              onClick={handleApproveBooking}
              sx={{ mb: 1 }}
            >
              Approve
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              fullWidth
              size="small"
              onClick={handleRejectBooking}
            >
              Reject
            </Button>
          </>
        )}

        {userRole === "user" && (
          <>
            <Button
              color="secondary"
              variant="outlined"
              fullWidth
              startIcon={<CreditScoreIcon />}
              size="small"
              onClick={() => onStatusChange()}
              sx={{ mb: 1 }}
            >
              Make Payment
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              startIcon={<HighlightOffIcon />}
              fullWidth
              size="small"
              onClick={handleCancelBooking}
            >
              Cancel
            </Button>
          </>
        )}
        <Button
          color="secondary"
          variant="outlined"
          fullWidth
          startIcon={<PreviewIcon />}
          size="small"
          onClick={() => onStatusChange()}
          sx={{ mb: 1 }}
        >
          View Booking
        </Button>
      </Menu>

      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 50,
        }}
      >
        <Chip
          variant="outlined"
          size="small"
          label={
            booking.status.charAt(0).toUpperCase() +
            booking.status.slice(1).replace("_", " ")
          }
          color={
            booking.status === "pending"
              ? "warning"
              : booking.status === "accepted" ||
                booking.status === "completed" ||
                booking.status === "partially_completed"
              ? "success"
              : booking.status === "rejected" || booking.status === "cancelled"
              ? "error"
              : "default"
          }
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "flex-start",
          }}
        >
          <CardMedia
            component="img"
            sx={{ height: 90, width: 160, borderRadius: 4, objectFit: "cover" }}
            image="/images/property-listing.jpg"
            alt="Property listing"
          />
          <Box
            sx={{
              pl: { xs: 0, md: 2 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography component="div">{booking.property}</Typography>
            <Typography component="div" sx={{ color: "text.secondary" }}>
              📅 {booking.checkIn} - {booking.checkOut}
            </Typography>
            <Typography component="div" sx={{ color: "text.secondary" }}>
              🏠 {booking.region}
            </Typography>
          </Box>
        </CardContent>
      </Box>

      <Box
        sx={{
          pl: 4,
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          justifyContent: "space-around",
          alignItems: "flex-end",
        }}
      >
        <Typography
          component="div"
          pr={4}
          variant="body1"
          color={"secondary.main"}
        >
          {formatCurrency(booking.amount)}
        </Typography>
      </Box>
    </Card>
  );
}
