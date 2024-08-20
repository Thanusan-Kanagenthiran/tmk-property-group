import { ImageModel } from "@/lib/image-model";
import { uploadImageToCloudinary } from "@/lib/image-upload";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const image = formData.get("image") as unknown as File;

  const data: any = await uploadImageToCloudinary(image, "property_images");
  await ImageModel.create({ image_url: data?.secure_url, public_id: data?.public_id });
  return NextResponse.json({ data: data }, { status: 200 });
};

export const GET = async (req: NextRequest) => {
  const images = await ImageModel.find();
  const data = images.map((image) => {
    const id = image._id;
    const image_url = image.image_url;
    const public_id = image.public_id.replace("property_images/", "");

    return {
      id: id,
      image_url: image_url,
      public_id: public_id
    };
  });
  return NextResponse.json({ data: data }, { status: 200 });
};
