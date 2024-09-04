// src/app/api/properties/[id]/images/route.ts
import dbConnect from "@/lib/db/dbConnect";
import { uploadImageToCloudinary } from "@/lib/cloudinary/image-upload";
import { deleteImageFromCloudinary } from "@/lib/cloudinary/delete-image";
import Property from "@/lib/db/models/Properties/Property";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    const uploadedData: any = await uploadImageToCloudinary(image, `property_images/${params.id}`);
    const url = uploadedData?.secure_url;
    const public_id = uploadedData?.public_id;

    if (!url || !public_id) {
      return NextResponse.json({ error: "Error while uploading image" }, { status: 400 });
    }

    await dbConnect();

    const property = await Property.findByIdAndUpdate(
      params.id,
      { $push: { images: { url, public_id } } },
      { new: true }
    ).lean();

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Image added successfully", images: property.images });
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();

    const property = await Property.findById(params.id).select("images").lean();
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    const images = property.images || [];

    const data = images.map((image) => {
      const { url, public_id } = image;

      return {
        url,
        public_id: public_id
      };
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error in GET:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    await dbConnect();

    const { public_id, propertyId  } = await req.json();

    console.log(propertyId, `+++`);

    if (!public_id) {
      return NextResponse.json({ error: "Public ID is required" }, { status: 400 });
    }

    await deleteImageFromCloudinary(public_id);

    console.log(`Attempting to delete image with public_id: ${public_id}`);

    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      { $pull: { images: { public_id } } },
      { new: true }
    ).lean();

    console.log(`Updated property after deleting image: ${JSON.stringify(updatedProperty, null, 2)}`);

    if (!updatedProperty) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Image deleted successfully", images: updatedProperty.images });
  } catch (error) {
    console.error("Error in DELETE:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
