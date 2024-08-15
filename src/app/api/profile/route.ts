"use server";

import { connectDB } from "@/lib/connection";
import User from "@/models/User";
import { NextResponse, type NextRequest } from "next/server";
import { getAuthToken } from "@/utils/auth";

export const GET = async (req: NextRequest) => {
  try {
    const token = await getAuthToken(req);
    await connectDB();
    const user = await User.findById(token.sub).select("-password -role -createdAt -updatedAt");
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.error();
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const token = await getAuthToken(req);
    if (!token || !token.sub) {
      return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
    }
    await connectDB();
    const { name, phone, image } = await req.json();

    const user = await User.findById(token.sub).select("-password -role -createdAt -updatedAt");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (image !== undefined) user.image = image;

    const updatedUser = await user.save();

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
