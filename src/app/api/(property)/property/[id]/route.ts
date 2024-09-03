"use server";
import dbConnect from "@/lib/db/dbConnect";
import Property from "@/lib/db/models/Properties/Property";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();

    // Fetch the property by ID, including its bookings
    const property = await Property.findOne({
      _id: params.id,
      isDeleted: false
    })
      .populate({
        path: "bookings",
        select: "checkIn checkOut" 
      })
      .lean()
      .exec();

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    const unavailableDates = new Set<string>();

    property.bookings?.forEach((booking: any) => {
      let current = new Date(booking.checkIn);
      const end = new Date(booking.checkOut);

      while (current <= end) {
        unavailableDates.add(current.toISOString().split('T')[0]); 
        current.setDate(current.getDate() + 1);
      }
    });

    // Construct the response data
    const data = {
      id: property._id.toString(),
      ...property,
      unavailableDates: Array.from(unavailableDates) 
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("An error occurred:", error); 
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
};


export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();
    // const userId = await getUserId(request);

    // Optionally check for user authorization
    // if (property.owner.toString() !== userId) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    // }
    const body = await request.json();

    // Extract and validate only the fields that you want to update
    const allowedFields = ["description", "noOfBeds", "noOfBaths", "maxNoOfGuests", "amenities", "pricePerNight"];
    const updateFields = {} as Record<string, any>;

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateFields[field] = body[field];
      }
    }

    // Find the property and ensure it's not deleted
    const property = await Property.findOne({ _id: params.id, isDeleted: false });
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // Update only the specified fields
    const updatedProperty = await Property.findOneAndUpdate({ _id: params.id }, { $set: updateFields }, { new: true });

    return NextResponse.json({ message: "Property successfully updated.", property: updatedProperty });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();
    // const userId = await getUserId(request);

    // if (property.owner.toString() !== userId) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    // }
    const property = await Property.findOne({ _id: params.id });
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }


    await Property.findOneAndUpdate({ _id: params.id }, { isDeleted: true });

    return NextResponse.json({ message: "Property successfully deleted." });
  } catch (error) {
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
