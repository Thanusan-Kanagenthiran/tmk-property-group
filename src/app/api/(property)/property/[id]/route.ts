"use server";
import dbConnect from "@/lib/db/dbConnect";
import Property from "@/lib/db/models/Properties/Property";
import { NextResponse, type NextRequest } from "next/server";
import { authUtils } from "@/lib/auth";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();
    // const userId = await authUtils.getUserId(request);

    // Find the property by _id and ensure it's not deleted
    const property = await Property.findOne({
      _id: params.id,
      isDeleted: false
    })
      .lean()
      .exec();

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // Uncomment and modify the following lines if you need to check user authorization
    // if (property.host.toString() !== userId) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    // }

    // No need to call toObject() if using lean()
    const { _id, ...rest } = property as { _id: string; [key: string]: any };

    const data = {
      id: _id, // `_id` should be a string
      ...rest
    };
    return NextResponse.json(data);
  } catch (error) {
    console.error("An error occurred:", error); // Log the error for debugging
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
};

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();
    // const userId = await getUserId(request);
    const body = await request.json();

    const property = await Property.findOne({ _id: params.id }).where("this.isDeleted == false");
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // if (property.owner.toString() !== userId) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    // }
    await Property.findOneAndUpdate({ _id: params.id }, body, { new: true });

    return NextResponse.json({ message: "Property successfully updated." });
  } catch (error) {
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();
    // const userId = await getUserId(request);
    const property = await Property.findOne({ _id: params.id });
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // if (property.owner.toString() !== userId) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    // }

    await Property.findOneAndUpdate({ _id: params.id }, { isDeleted: true });

    return NextResponse.json({ message: "Property successfully deleted." });
  } catch (error) {
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
