"use server";

import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";
import { authUtils } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export const PUT = async (request: NextRequest) => {
  try {
    const userId = await authUtils.getUserId(request);
    if (!userId) {
      console.error("User ID not found. Unauthorized access attempt.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await dbConnect();
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      console.error("Both current and new passwords are required.");
      return NextResponse.json({ error: "Both current and new passwords are required" }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found.");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      console.error("Incorrect current password.");
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("PUT Handler Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
};
