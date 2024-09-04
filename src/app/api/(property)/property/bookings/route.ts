import { authUtils } from "@/lib/auth";
import dbConnect from "@/lib/db/dbConnect";
import Booking from "@/lib/db/models/Properties/Booking";
import { NextResponse, type NextRequest } from "next/server";

const transformBooking = (booking: any, role: string) => {
  return {
    id: booking._id.toString(),
    property: booking.propertyId.title,
    region: booking.propertyId.region,
    amount: booking.amount,
    paymentStatus: booking.paymentStatus,
    status: booking.status,
    checkIn: booking.checkIn.toISOString().split("T")[0],
    checkOut: booking.checkOut.toISOString().split("T")[0],
    ...(role === "host" ? { tenant: booking.tenantId.email } : {}),
  };
};

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();

    const userId = await authUtils.getUserId(request);
    const role = await authUtils.getUserRole(request);

    if (!userId || !role) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let bookings;
    if (role === "host") {
      bookings = await Booking.find({ hostId: userId })
        .populate("tenantId", "email name")
        .populate("propertyId", "title region")
        .exec();
    } else if (role === "user") {
      bookings = await Booking.find({ tenantId: userId })
        .populate("propertyId", "title region")
        .exec();
    } else {
      return NextResponse.json({ message: "Role not recognized" }, { status: 403 });
    }

    if (!bookings || bookings.length === 0) {
      return NextResponse.json({ bookings: [] }, { status: 200 });
    }

    const transformedBookings = bookings.map((booking) =>
      transformBooking(booking, role)
    );

    return NextResponse.json({ bookings: transformedBookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
};
