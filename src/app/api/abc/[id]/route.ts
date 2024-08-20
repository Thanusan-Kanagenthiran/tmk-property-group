import { deleteImageFromCloudinary } from "@/lib/delete-image";
import { UserModelWithImage } from "@/lib/image-model";
import { uploadImageToCloudinary } from "@/lib/image-upload";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const image = await UserModelWithImage.findOne({ _id: params.id });
  const data = {
    id: image._id,
    image_url: image.image_url,
    public_id: image.public_id.replace("property_images/", "")
  };

  return NextResponse.json({ data: data }, { status: 200 });
};

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const public_id = await UserModelWithImage.findOne({ _id: params.id });
    if (!public_id) {
      return NextResponse.json({ error: "Image is not found" }, { status: 400 });
    }
    const result_delete_from_cloudinary = await deleteImageFromCloudinary(public_id);
    if (result_delete_from_cloudinary.error as string) {
      return NextResponse.json({ error: result_delete_from_cloudinary.error }, { status: 400 });
    }
    await UserModelWithImage.findOneAndDelete({ _id: params.id });

    return NextResponse.json({ message: "Image deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const formData = await req.formData();
    const newImage = formData.get("image") as unknown as File;

    const image = await UserModelWithImage.findOne({ _id: params.id });
    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Upload the new image to Cloudinary
    const cloudinaryResponse: any = await uploadImageToCloudinary(newImage, "property_images"); // Implement this function
    if (cloudinaryResponse.error) {
      return NextResponse.json({ error: cloudinaryResponse.error }, { status: 400 });
    }

    // Delete the old image from Cloudinary
    const deleteResult = await deleteImageFromCloudinary(image.public_id); // Implement this function
    if (deleteResult.error) {
      return NextResponse.json({ error: deleteResult.error }, { status: 400 });
    }

    // Update the image details in the database
    const updatedImage = await UserModelWithImage.findOneAndUpdate(
      { _id: params.id },
      { image_url: cloudinaryResponse.url, public_id: cloudinaryResponse.public_id },
      { new: true } // Return the updated document
    );

    return NextResponse.json({ data: updatedImage, message: "Image updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};
