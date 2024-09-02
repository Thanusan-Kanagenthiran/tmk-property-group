"use server";
import { authUtils } from "@/lib/auth";
import dbConnect from "@/lib/db/dbConnect";
import Property from "@/lib/db/models/Properties/Property";
import { NextResponse, type NextRequest } from "next/server";
import PropertyType from "@/lib/db/models/Properties/PropertyType";

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();
    const propertyTypes = await PropertyType.find().select("_id title").lean().exec();
    const properties = await Property.find({ isDeleted: false })
      .select("-host -isDeleted -createdAt -updatedAt")
      .populate("propertyType", "_id title")
      .lean()
      .exec();
    console.timeEnd("Fetching properties");

    if (!properties || properties.length === 0) {
      return NextResponse.json({ message: "No properties found." }, { status: 404 });
    }

    const data = properties.map((property: any) => {
      const { _id, images, propertyType, ...rest } = property;

      return {
        id: _id,
        propertyType: {
          id: propertyType?._id.toString(),
          title: propertyType.title
        },
        image: images.length > 0 ? images[0].url : "",
        ...rest
      };
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const isHost = await authUtils.isPropertyOwner(request);
    if (!isHost) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const userId = await authUtils.getUserId(request);

    await dbConnect();
    const body = await request.json();
    const newProperty = new Property({
      ...body,
      host: userId
    });
    const savedProperty = await newProperty.save();

    // Return the property ID in a JSON response
    return NextResponse.json({ id: savedProperty._id.toString() }, { status: 201 });
  } catch (error) {
    console.error("POST Handler Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
