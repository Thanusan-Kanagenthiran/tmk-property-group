import dbConnect from "@/lib/db/dbConnect";
import { UserModelWithImage } from "@/lib/cloudinary/image-model";
import { uploadImageToCloudinary } from "@/lib/cloudinary/image-upload";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
   
    const formData = await req.formData();
    let image = formData.get("image") as unknown as File;

    const uploadedData: any = await uploadImageToCloudinary(image, "property_images/id");

  
    console.log("Uploaded image data:", uploadedData);
    const image_url = uploadedData?.secure_url;
    console.log("Uploaded image URL:", image_url);
    const public_id = uploadedData?.public_id;
    console.log("Uploaded image public ID:", public_id);
    // Create a new document in the database
    const savedData = await UserModelWithImage.create({
      image: {
        image_url: image_url,
        public_id: public_id
      }
    });

    // Log saved data
    console.log("Saved data:", savedData);

    // Return a successful response
    return NextResponse.json({ data: savedData }, { status: 200 });
  } catch (error) {
    // Log the error and return an error response
    console.error("Error in POST handler:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  dbConnect();
  const users = await UserModelWithImage.find();
  const data = users.map((user) => {
    const id = user._id;
    const image_url = user.image.image_url;
    const public_id = user.image.public_id.replace("property_images/", "");

    return {
      id: id,
      image: {
        url: image_url,
        public_id: public_id
      }
    };
  });
  return NextResponse.json({ data: data }, { status: 200 });
};
