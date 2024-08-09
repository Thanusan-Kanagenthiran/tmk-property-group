"use server"

import { editUser } from "@/actions/edit";
import { connectDB } from "@/lib/connection";
import User from "@/models/User";
import { NextResponse, type NextRequest } from "next/server";


export const GET = async (request: NextRequest,  { params }: { params: { id: string } }) => {
  try {
    await connectDB();
      const user = await User.findById(params.id).select('-password').select('-role').select('-createdAt').select('-updatedAt');
      if (!user) {
        return NextResponse.json({ error: "user not found" }, { status: 404 });
      }
      return NextResponse.json(user);

  } catch (error) {
    return NextResponse.error();
  }
}

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB();
    const body = await request.json();

    const response = await editUser({ ...body, _id: params.id });
    if (response.error) {
      return NextResponse.json({ error: response.error }, { status: 400 });
    }

    if (!response.user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(response.user);
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.error();
  }
}

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
	try {
		await connectDB();
		const response = await User.findByIdAndDelete(params.id);
		if (!response) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}
		return NextResponse.json("User deleted successfully");
	} catch (error) {
		console.error('DELETE Error:', error);
		return NextResponse.error();
	}
}


