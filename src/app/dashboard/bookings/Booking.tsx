import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import { formatCurrency } from "@/lib/util/formatCurrency";
import { BookingDTO } from "./page";
import { Chip } from "@mui/material";

interface BookingProps {
  booking: BookingDTO;
}

export default function BookingCard({ booking }: BookingProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: { xs: "center", md: "space-between" },
        px: 2,
        position: "relative"
      }}>
      <IconButton
        sx={{ position: "absolute", top: 8, right: 8 }}
        aria-controls={open ? "booking-menu" : undefined}
        aria-haspopup="true"
        onClick={handleMenuClick}>
        <MoreVertIcon />
      </IconButton>

      {/* Menu */}
      <Menu
        id="booking-menu"
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>
          <EditIcon sx={{ mr: 1, color: "secondary.main", fontSize: 16 }} />
          Approve
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <EditIcon sx={{ mr: 1, color: "secondary.main", fontSize: 16 }} />
          Reject
        </MenuItem>
      </Menu>

      <Box
        sx={{
          position: "absolute",
          top: 8,
          left: 8
        }}>
        <Chip
          label={booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace("_", " ")}
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
            alignItems: "flex-start"
          }}>
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
              justifyContent: "space-between"
            }}>
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
          alignItems: "flex-end"
        }}>
        <Typography component="div" pr={4} variant="body1" color={"secondary.main"}>
          {formatCurrency(booking.amount)}
        </Typography>
      </Box>
    </Card>
  );
}
