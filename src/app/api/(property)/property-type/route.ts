"use server";
import dbConnect from "@/lib/db/dbConnect";
import PropertyType from "@/lib/db/models/Properties/PropertyType";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();

    const propertiesType = await PropertyType.find().select("+_id +name +description");

    return NextResponse.json(propertiesType);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error();
  }
};

export const POST = async (request: NextRequest) => {
  try {
    await dbConnect();
    const body = await request.json();
    const newPropertyType = new PropertyType({
      ...body
    });
    await newPropertyType.save();
    return NextResponse.json(newPropertyType, { status: 201 });
  } catch (error) {
    console.error("POST Handler Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
