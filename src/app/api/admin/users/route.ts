"use server";

import { register } from "@/actions/users/register";
import { connectDB } from "@/lib/connection";
import User from "@/models/User";
import { isAdmin } from "@/utils/auth";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    if (!await isAdmin(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    await connectDB();

    const url = new URL(request.url);
    const role = url.searchParams.get("role");

    const query = role ? { role } : {};

    const users = await User.find(query).select("-password -__v");

    const transformedUsers = users.map((user) => {
      const { _id, ...rest } = user.toObject();
      return {
        id: _id.toString(),
        ...rest,
      };
    });

    return NextResponse.json(transformedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error();
  }
};

export const POST = async (request: NextRequest) => {
  try {
    if (!await isAdmin(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const result = await register(body);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json(result.message, { status: 201 });
  } catch (error) {
    console.error("POST Handler Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
