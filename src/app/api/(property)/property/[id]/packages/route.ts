import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/db/dbConnect";
import Property from "@/lib/db/models/Properties/Property";

export const POST = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();
    const body = await request.json();

    // Validate the body content
    const { packageName, packagePricePerDay, durationRequirementDays } = body;
    if (!packageName || !packagePricePerDay) {
      return NextResponse.json({ error: "packageName and packagePricePerDay are required." }, { status: 400 });
    }

    // Find the property
    const property = await Property.findOne({ _id: params.id, isDeleted: false });
    if (!property) {
      return NextResponse.json({ error: "Property not found." }, { status: 404 });
    }

    // Add the new package
    property.packages?.push({
      packageName,
      packagePricePerDay,
      durationRequirementDays
    });

    await property.save();

    return NextResponse.json({ message: "Package successfully added.", property });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();

    // Find the property by ID and ensure it's not deleted
    const property = await Property.findOne({ _id: params.id, isDeleted: false }).select("packages");

    if (!property) {
      return NextResponse.json({ error: "Property not found." }, { status: 404 });
    }

    return NextResponse.json({ packages: property.packages });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();
    const body = await request.json();

    const { packageName, packagePricePerDay, durationRequirementDays } = body;

    if (!packageName) {
      return NextResponse.json({ error: "packageName is required to identify the package." }, { status: 400 });
    }

    // Find the property
    const property = await Property.findOne({ _id: params.id, isDeleted: false });
    if (!property) {
      return NextResponse.json({ error: "Property not found." }, { status: 404 });
    }

    // Ensure packages array is not undefined or null
    property.packages = property.packages ?? [];

    // Find the package by packageName
    const packageIndex = property.packages.findIndex((pkg) => pkg.packageName === packageName);

    if (packageIndex === -1) {
      return NextResponse.json({ error: `Package with packageName '${packageName}' not found.` }, { status: 404 });
    }

    // Update only the specified fields
    if (packagePricePerDay !== undefined) {
      property.packages[packageIndex].packagePricePerDay = packagePricePerDay;
    }
    if (durationRequirementDays !== undefined) {
      property.packages[packageIndex].durationRequirementDays = durationRequirementDays;
    }

    // Save the updated property
    await property.save();

    return NextResponse.json({ message: "Package successfully updated.", property });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
