// app/api/images/route.ts
import { deleteImageFromCloudinary } from "@/actions/users/images";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const { public_id } = await request.json();

    if (!public_id) {
      return NextResponse.json({ error: "public_id is required" }, { status: 400 });
    }

    const result = await deleteImageFromCloudinary(public_id);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ message: "Image deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("POST Handler Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
