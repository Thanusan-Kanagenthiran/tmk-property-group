import { authUtils } from "@/lib/auth";
import dbConnect from "@/lib/db/dbConnect";
import Booking from "@/lib/db/models/Properties/Booking";
import { NextResponse, type NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const isUser = await authUtils.isUser(request);
    if (!isUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const userId = await authUtils.getUserId(request);
    await dbConnect();
    const body = await request.json();
    const newBooking = new Booking({
      ...body,
      tenantId: userId
    });
    await newBooking.save();

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error("POST Handler Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
