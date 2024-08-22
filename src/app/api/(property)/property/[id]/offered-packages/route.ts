"use server";
import dbConnect from "@/lib/db/dbConnect";
import Property from "@/lib/db/models/Properties/Property";
import { NextResponse, type NextRequest } from "next/server";
import { authUtils } from "@/lib/auth";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();
    // const userId = await authUtils.getUserId(request);

		const propertyPackages=await Property.findOne({ _id: params.id }).select("packages");
		

    if (!propertyPackages) {
      return NextResponse.json({ error: "No packages found" }, { status: 404 });
    }

    // if (property.host.toString() !== userId) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    // }

    return NextResponse.json({ propertyPackages });
  } catch (error) {
    console.error("An error occurred:", error); // Log the error for debugging
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
};
