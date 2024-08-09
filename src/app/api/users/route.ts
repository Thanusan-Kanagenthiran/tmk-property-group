"use server"

import { register } from "@/actions/register";
import { connectDB } from "@/lib/connection";
import User from "@/models/User";
import { NextResponse, type NextRequest } from "next/server";


export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

      const users = await User.find().select('-password').select('-role')
      return NextResponse.json(users);

  } catch (error) {
    return NextResponse.error();
  }
}



export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const result = await register(body);

        if (result.error) {
            return NextResponse.json({ error: result.error }, { status: 400 }); // Bad Request
        }
        return NextResponse.json(result.user, { status: 201 }); // Created
    } catch (error) {
        console.error('POST Handler Error:', error);
        return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 }); // Internal Server Error
    }
}
