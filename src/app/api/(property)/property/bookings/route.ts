import { authUtils } from "@/lib/auth";
import dbConnect from "@/lib/db/dbConnect";
import Booking from "@/lib/db/models/Properties/Booking";
import { NextResponse, type NextRequest } from "next/server";

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
      bookings = await Booking.find({ hostId: userId }).exec();
    } else if (role === "user") {
      bookings = await Booking.find({ tenantId: userId }).exec();
    } else {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (bookings.length === 0) {
      return NextResponse.json({ message: "No bookings found" });
    }

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
};
