import { authUtils } from "@/lib/auth";
import dbConnect from "@/lib/db/dbConnect";
import Booking from "@/lib/db/models/Properties/Booking";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    const userId = await authUtils.getUserId(request);

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated." }, { status: 401 });
    }

    const { id } = params;
    const booking = await Booking.findById(id).select("status hostId tenantId").lean().exec();

    if (!booking) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    const bookingHostIdString = booking.hostId.toString();

    if (userId !== bookingHostIdString) {
      return NextResponse.json({ error: "You are not authorized to access this booking." }, { status: 403 });
    }

    if (booking.status !== "pending") {
      return NextResponse.json({ error: "Only pending bookings can be approved or rejected." }, { status: 400 });
    }

    if (action === "approve") {
      await Booking.findByIdAndUpdate(id, { status: "accepted" });
      return NextResponse.json({ message: "Booking approved successfully." }, { status: 200 });
    } else if (action === "reject") {
      await Booking.findByIdAndUpdate(id, { status: "rejected" });
      return NextResponse.json({ message: "Booking rejected successfully." }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Invalid action specified." }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
