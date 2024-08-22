"use server";
import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";
import { authUtils } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();
    const userId = authUtils.getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }
    const user = await User.findById(userId).select("-password -role -__v");

    const transformedUser = {
      id: user._id,
      ...user._doc
    };
    return NextResponse.json(transformedUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.error();
  }
};

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    if (!(await authUtils.isAdmin(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    await dbConnect();
    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.isDeleted = true;

    const deletedUser = await user.save();
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

    const user = await User.findOneAndUpdate({ _id: params.id }, body, { new: true });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = await user.save();
    return NextResponse.json("User Details updated successfully");
  } catch (error) {
    console.error("PATCH Handler Error:", error);
    return NextResponse.error();
  }
};