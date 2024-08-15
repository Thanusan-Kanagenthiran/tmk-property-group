"use server";

import { connectDB } from "@/lib/connection";
import Property from "@/models/Property";
import { getUserId } from "@/utils/auth";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB();
    const properties = await Property.findOne({ _id: params.id })
      .populate({
        path: "owner",
        select: "name email phone",
      })
      .exec();

    return NextResponse.json(properties);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error();
  }
};

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB();
    const userId = await getUserId(request);
    const body = await request.json();

    const property = await Property.findOne({ _id: params.id });
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    if (property.owner.toString() !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const updatedProperty = await Property.findOneAndUpdate({ _id: params.id }, body, { new: true });

    return NextResponse.json({
      message: "Property successfully updated.",
      property: updatedProperty,
    });
  } catch (error) {
    console.error("PATCH Handler Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB();
    const userId = await getUserId(request);
    const property = await Property.findOne({ _id: params.id });
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    if (property.owner.toString() !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const deletedProperty = await Property.findOneAndUpdate({ _id: params.id }, { isDeleted: true }, { new: true });

    return NextResponse.json({
      message: "Property successfully deleted.",
      property: deletedProperty,
    });
  } catch (error) {
    console.error("DELETE Handler Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
