import { authUtils } from "@/lib/auth";
import dbConnect from "@/lib/db/dbConnect";
import Booking from "@/lib/db/models/Properties/Booking";
import { NextResponse, type NextRequest } from "next/server";

const transformBooking = (booking: any) => {
  return {
    id: booking._id.toString(),
    tenantId: booking.tenantId ? {
      id: booking.tenantId._id.toString(),
      email: booking.tenantId.email,
      name: booking.tenantId.name,
    } : null,
    propertyId: booking.propertyId.toString(),
    amount: booking.amount,
    paymentStatus: booking.paymentStatus,
    status: booking.status,
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    hostId: booking.hostId.toString(),
    createdAt: booking.createdAt,
    updatedAt: booking.updatedAt,
  };
};

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();

    const authToken = await authUtils.getAuthToken(request);
    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const userId = await authUtils.getUserId(request);
    const role = await authUtils.getUserRole(request);

    console.log("role", role);

    let bookings;
    if (role === "host") {
      bookings = await Booking.find({ hostId: userId })
        .populate("tenantId", "email name") 
        .exec();
    } else if (role === "user") {
      bookings = await Booking.find({ tenantId: userId })
        .populate("hostId", "email name") 
        .exec();
    } else {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (bookings.length === 0) {
      return NextResponse.json({ message: "No bookings found" });
    }

    const transformedBookings = bookings.map(transformBooking);

    return NextResponse.json(transformedBookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
};
