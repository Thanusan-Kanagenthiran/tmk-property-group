"use server";
import { dbConnect } from "@/lib/db/dbConnect";
import PropertyType from "@/lib/db/models/Properties/PropertyType";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();
    const properties = await PropertyType.find().select("-createdAt -updatedAt").lean().exec();

    if (!properties) {
      return NextResponse.json({ error: "No property type found" }, { status: 404 });
    }
    const data = properties.map((property: any) => {
      const { _id, ...rest } = property;
      return {
        id: _id,
        ...rest
      };
    });
    

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
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
    return NextResponse.json({ message: "Property type successfully created." }, { status: 201 });
  } catch (error) {
    console.error("POST Handler Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
