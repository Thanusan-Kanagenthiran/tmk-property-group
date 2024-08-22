"use server";
import dbConnect from "@/lib/db/dbConnect";
import Property from "@/lib/db/models/Properties/Property";
import { NextResponse, type NextRequest } from "next/server";
import { authUtils } from "@/lib/auth";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();
    // const userId = await authUtils.getUserId(request);

    const property = await Property.findOne({ _id: params.id });

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // if (property.host.toString() !== userId) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    // }

    return NextResponse.json({ property });
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
    const updatedProperty = await Property.findOneAndUpdate({ _id: params.id }, body, { new: true });

    return NextResponse.json({
      message: "Property successfully updated.",
      property: updatedProperty
    });
  } catch (error) {
    console.error("PATCH Handler Error:", error);
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

    const deletedProperty = await Property.findOneAndUpdate({ _id: params.id }, { isDeleted: true });

    return NextResponse.json({
      message: "Property successfully deleted."
    });
  } catch (error) {
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
