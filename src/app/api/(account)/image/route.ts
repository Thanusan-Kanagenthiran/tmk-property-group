import User from "@/lib/db/models/User";
import { uploadImageToCloudinary } from "@/lib/cloudinary/image-upload";
import { NextRequest, NextResponse } from "next/server";
import { authUtils } from "@/lib/auth/authUtils";
import dbConnect from "@/lib/db/dbConnect";
import { deleteImageFromCloudinary } from "@/lib/cloudinary/delete-image";

export const GET = async (request: NextRequest) => {
  try {
    const userId = await authUtils.getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    await dbConnect();
    const user = await User.findById(userId).select("image");

    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    const image = user.image?.url ? user.image.url : null;

    return NextResponse.json(image);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.error();
  }
};
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
    // Connect to the database
    await dbConnect();

    // Retrieve user ID from the request
    const userId = await authUtils.getUserId(req);

    // Check if user ID was retrieved successfully
    if (!userId) {
      return NextResponse.json({ error: "User ID could not be retrieved" }, { status: 401 });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user was found
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the user has an image to delete
    const publicId = user.image?.public_id;
    if (!publicId) {
      return NextResponse.json({ error: "No image to delete" }, { status: 400 });
    }

    // Delete the image from Cloudinary
    await deleteImageFromCloudinary(publicId);

    // Update the user document to remove the image reference
    await User.findByIdAndUpdate(
      userId,
      { image: { src: null, public_id: null } }, // Set fields to null
      { new: true }
    );

    // Respond with a success message
    return NextResponse.json({ message: "Image deleted successfully" }, { status: 200 });
  } catch (error) {
    // Log and respond with a generic error message
    console.error("Error deleting image:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
};
