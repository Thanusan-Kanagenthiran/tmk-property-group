import { authUtils } from "@/lib/auth";
import dbConnect from "@/lib/db/dbConnect";
import Booking from "@/lib/db/models/Properties/Booking";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();

    const userId = await authUtils.getUserId(request);

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated." }, { status: 401 });
    }

    const { id } = params;
    const booking = await Booking.findById(id).select("status tenantId").lean().exec();

    if (!booking) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    const bookingTenantIdString = booking.tenantId.toString();

    if (userId !== bookingTenantIdString) {
      return NextResponse.json({ error: "You are not authorized to access this booking." }, { status: 403 });
    }

    if (booking.status !== "pending") {
      return NextResponse.json({ error: "Only pending bookings can be cancelled." }, { status: 400 });
    }

    await Booking.findByIdAndUpdate(id, { status: "cancelled" });

    return NextResponse.json({ message: "Booking Cancelled successfully." }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
