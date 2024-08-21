"use server";
import { fetchPropertiesAllByImages } from "@/actions/users/images";
import { connectDB } from "@/lib/connection";
import Property from "@/models/Property";
import { getUserId } from "@/utils/auth";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const properties = await Property.find()
      .populate({
        path: "owner",
        select: "name email phone"
      })
      .exec();

    const propertiesWithImages = await Promise.all(
      properties.map(async (property) => {
        const images = await fetchPropertiesAllByImages(property._id);
        const imageUrls = images.map((image: { url: string }) => image.url);
        return {
          id: property._id.toString(),
          image: imageUrls[0] || null,
          packageType: property.packageType,
          propertyType: property.propertyType,
          title: property.title,
          description: property.description,
          location: property.location,
          numberOfBeds: property.noOfBeds,
          numberOfBaths: property.noOfBaths,
          area: property.area
        };
      })
    );

    return NextResponse.json(propertiesWithImages);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error();
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const userId = await getUserId(request);

    const body = await request.json();
    const newProperty = new Property({
      ...body,
      owner: userId
    });
    await newProperty.save();

    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error("POST Handler Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
