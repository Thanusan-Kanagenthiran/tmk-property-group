"use server";

import { fetchPropertiesAllByImages } from "@/actions/users/images";
import { connectDB } from "@/lib/connection";
import Property from "@/models/Property";
import { getUserId } from "@/utils/auth";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB();
    const property = await Property.findOne({ _id: params.id })
      .populate({
        path: "owner",
        select: "name email phone"
      })
      .exec();

    if (!property) {
      throw new Error("Property not found");
    }

    const images = await fetchPropertiesAllByImages(property._id);
    const imageUrls = images.map((image) => image.url);

    const propertyWithImages = {
      id: property._id.toString(),
      featureImage: imageUrls[0] || null,
      images: imageUrls,
      packageType: property.packageType,
      propertyType: property.propertyType,
      title: property.title,
      description: property.description,
      location: property.location,
      numberOfBeds: property.noOfBeds,
      numberOfBaths: property.noOfBaths,
      area: property.area,
      owner: {
        name: property.owner.name,
        email: property.owner.email,
        phone: property.owner.phone,
        image: property.owner.image,
        id: property.owner._id
      },
      amenities: property.amenities,
      createdAt: property.createdAt,
      isDeleted: property.isDeleted
    };

    return NextResponse.json(propertyWithImages);
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
      property: updatedProperty
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
      property: deletedProperty
    });
  } catch (error) {
    console.error("DELETE Handler Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
