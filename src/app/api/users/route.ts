"use server";
import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";
import { authUtils } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();

    const users = await User.find().select("-password  -updatedAt -__v ").lean().exec();

    if (!users) {
      return NextResponse.json({ error: "No users found" }, { status: 404 });
    }

    const data = users.map((user) => {
      const { _id, image, ...rest } = user;

      return {
        id: _id,
        image: image?.url || null,
        ...rest
      };
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.error();
  }
};

