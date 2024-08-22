import { User } from "@/lib/db/models/User";
import { uploadImageToCloudinary } from "@/lib/cloudinary/image-upload";
import { NextRequest, NextResponse } from "next/server";
import { authUtils } from "@/lib/auth/authUtils";
import dbConnect from "@/lib/db/dbConnect";
import { deleteImageFromCloudinary } from "@/lib/cloudinary/delete-image";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as unknown as File;

    if (!image) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    const uploadedData: any = await uploadImageToCloudinary(image, "user_images");
    const userId = await authUtils.getUserId(req);

    if (!userId) {
      return NextResponse.json({ error: "User ID could not be retrieved" }, { status: 401 });
    }

    const imageUrl = uploadedData?.secure_url;
    const publicId = uploadedData?.public_id;

    await dbConnect();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        image: {
          url: imageUrl,
          public_id: publicId
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Image uploaded successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating image:", error); // Log the actual error
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    await dbConnect();
    const formData = await req.formData();
    const image = formData.get("image") as unknown as File;

    if (!image) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    const uploadedData: any = await uploadImageToCloudinary(image, "user_images");
    const imageUrl = uploadedData?.secure_url;
    const publicId = uploadedData?.public_id;
    const userId = await authUtils.getUserId(req);

    if (!userId) {
      return NextResponse.json({ error: "User ID could not be retrieved" }, { status: 401 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        image: {
          url: imageUrl,
          public_id: publicId
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Image uploaded successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating image:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    await dbConnect();
    const userId = await authUtils.getUserId(req);

    if (!userId) {
      return NextResponse.json({ error: "User ID could not be retrieved" }, { status: 401 });
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const publicId = user.image?.public_id;

    if (!publicId) {
      return NextResponse.json({ error: "No image to delete" }, { status: 400 });
    }
    await deleteImageFromCloudinary(publicId);

    await User.findByIdAndUpdate(
      userId,
      {
        image: undefined
      },
      { new: true }
    );

    return NextResponse.json({ message: "Image deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
};
