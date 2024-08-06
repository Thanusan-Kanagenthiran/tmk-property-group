import { NextResponse, type NextRequest } from "next/server";
import { DbConnect } from "@/lib/database/connection";
import Property from "@/lib/models/properties";

export const GET = async (request: NextRequest) => {
  try {
    await DbConnect();
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (id) {
      // Fetch a single property by ID
      const property = await Property.findById(id);
      if (!property) {
        return NextResponse.json({ error: "Property not found" }, { status: 404 });
      }
      return NextResponse.json(property);
    } else {
      // Fetch all properties
      const properties = await Property.find();
      return NextResponse.json(properties);
    }
  } catch (error) {
    return NextResponse.error();
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await DbConnect();
    const property = await Property.create(body);
    return new NextResponse(JSON.stringify({ property }), {
      status: 201,
    });
  } catch (error) {
    return NextResponse.error();
  }
};

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    await DbConnect();
    const property = await Property.findByIdAndDelete(id);

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json({ property }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    await DbConnect();
    const property = await Property.findByIdAndUpdate(body.id, body);
    return new NextResponse(JSON.stringify({ property }), {
      status: 201,
    });
  } catch (error) {
    return NextResponse.error();
  }
};
