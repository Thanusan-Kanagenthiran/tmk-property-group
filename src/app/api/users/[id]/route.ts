"use server";
import dbConnect from "@/lib/db/dbConnect";
import { authUtils } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";
import User from "@/lib/db/models/User";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();

    const user = await User.findOne({ _id: params.id }).select("-password  -updatedAt -__v ").lean().exec();

    if (!user) {
      return NextResponse.json({ error: "No users found" }, { status: 404 });
    }

    const { _id, image, ...rest } = user;

    const data = {
      id: _id,
      image: image?.url || null,
      ...rest
    };
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.error();
  }
};

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();
    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.isDeleted = true;

    await user.save();
    return NextResponse.json("User deleted successfully");
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.error();
  }
};

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();
    const body = await request.json();

    // Use runValidators to ensure validation is applied
    const user = await User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // No need to call user.save() here
    return NextResponse.json({ message: "User details updated successfully" });
  } catch (error) {
    console.error("PUT Handler Error:", error);
    // Return a more specific error message if possible
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
