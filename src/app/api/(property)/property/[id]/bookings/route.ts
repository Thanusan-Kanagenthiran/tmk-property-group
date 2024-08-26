import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    return NextResponse.json("Connection tested");
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error();
  }
};
