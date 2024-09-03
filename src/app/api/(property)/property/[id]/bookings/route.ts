"use server";
import { authUtils } from "@/lib/auth";
import dbConnect from "@/lib/db/dbConnect";
import Booking from "@/lib/db/models/Properties/Booking";
import Property from "@/lib/db/models/Properties/Property";
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

    // Validate the propertyId before creating the booking
    const property = await Property.findById(body.propertyId);
    if (!property) {
      return NextResponse.json({ error: "Property not found." }, { status: 404 });
    }

    const newBooking = new Booking({
      ...body,
      tenantId: userId
    });

    await newBooking.save();

    await Property.updateOne({ _id: property._id }, { $push: { bookings: newBooking._id } });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error("POST Handler Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
