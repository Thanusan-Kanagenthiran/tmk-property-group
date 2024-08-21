"use server";
import dbConnect from "@/lib/db/dbConnect";
import Property from "@/lib/db/models/Properties/Property";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();

    const properties = await Property.find();

    return NextResponse.json(properties);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error();
  }
};

export const POST = async (request: NextRequest) => {
  try {
    // const userId = await getUserId(request);
    await dbConnect();
    const body = await request.json();
    const newProperty = new Property({
      ...body
      // owner: userId
    });
    await newProperty.save();

    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error("POST Handler Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
