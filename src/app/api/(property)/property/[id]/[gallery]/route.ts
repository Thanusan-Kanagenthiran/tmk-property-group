import dbConnect from "@/lib/db/dbConnect";
import { uploadImageToCloudinary } from "@/lib/cloudinary/image-upload";
import { NextRequest, NextResponse } from "next/server";
import Property from "@/lib/db/models/Properties/Property";

export const POST = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const formData = await request.formData();
    let image = formData.get("image") as unknown as File;

    const uploadedData: any = await uploadImageToCloudinary(image, `property_images/${params.id}`);

    const url = uploadedData?.secure_url;
    const public_id = uploadedData?.public_id;
    await dbConnect();

    if (!url || !public_id) {
      return NextResponse.json({ error: "Error while uploading image" }, { status: 400 });
    }

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
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await dbConnect(); // Ensure database connection is established

    const property = await Property.findById(params.id).select("images").lean().exec();
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    const images = property.images || [];

    const data = images.map((image) => {
      const { url, public_id } = image;
      const formattedPublicId = public_id.replace("property_images/", "");
      return {
        url,
        public_id: formattedPublicId
      };
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
