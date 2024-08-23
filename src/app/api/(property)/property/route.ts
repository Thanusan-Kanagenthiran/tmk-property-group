"use server";
import { authUtils } from "@/lib/auth";
import dbConnect from "@/lib/db/dbConnect";
import Property from "@/lib/db/models/Properties/Property";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();

    const properties = await Property.find()
      .select("-packages -host -createdAt -updatedAt -packages -isDeleted ")
      .populate("propertyType")
      .where("isDeleted==false")
      .lean()
      .exec();

    const data = properties.map((property) => {
      const { _id, images, ...rest } = property;

      return {
        id: _id,
        ...rest
      };
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error();
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const userId = await authUtils.getUserId(request);
    await dbConnect();
    const body = await request.json();
    const newProperty = new Property({
      ...body,
      host: userId
    });
    await newProperty.save();

    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error("POST Handler Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
