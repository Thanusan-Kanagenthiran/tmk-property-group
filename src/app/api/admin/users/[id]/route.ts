"use server"
import { connectDB } from "@/lib/connection";
import User from "@/models/User";
import { isAdmin } from "@/utils/auth";
import { NextResponse, type NextRequest } from "next/server";


export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    if (!await isAdmin(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    await connectDB();
    const user = await User.findById(params.id).select("-password -role -__v");

    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }
    const transformedUser = {
      id: user._id,
      ...user._doc
    };
    delete transformedUser._id;
    return NextResponse.json(transformedUser);

  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.error();
  }
}


export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
	try {
    if (!await isAdmin(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
		await connectDB();
		const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.isDeleted = true;

    const updatedUser = await user.save();
		return NextResponse.json("User deleted successfully");

	} catch (error) {
		console.error('DELETE Error:', error);
		return NextResponse.error();
	}
}


