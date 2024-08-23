"use server";
import { authUtils } from "@/lib/auth";
import dbConnect from "@/lib/db/dbConnect";
import Property from "@/lib/db/models/Properties/Property";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();

    const properties = await Property.find({ isDeleted: false })
      .select("-packages -host -createdAt -updatedAt -isDeleted")
      .populate({
        path: "propertyType",
        select: "+_id +title"
      })
      .lean()
      .exec();

    const data = properties.map((property: any) => {
      const { _id, images, propertyType, ...rest } = property;

      return {
        id: _id,
        propertyType: {
          id: propertyType?._id.toString(),
          title: propertyType.title
        },
        image: images[0].url,
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
