import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/db/dbConnect";
import Property from "@/lib/db/models/Properties/Property";



export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();

    // Find the property by ID and ensure it's not deleted
    const property = await Property.findOne({ _id: params.id, isDeleted: false }).select("packages");

    if (!property) {
      return NextResponse.json({ error: "Property not found." }, { status: 404 });
    }

    // Manually remove the _id field from each package
    const packages = property.packages?.map((pkg: any) => {
      const { _id, ...rest } = pkg._doc; // '_doc' is used to access the original document without Mongoose meta fields
      return rest;
    });

    return NextResponse.json({ packages });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();
    const body = await request.json();

    const { packageName, packagePricePerDay, packageDescription, durationRequirementDays } = body;

    // Validate that packageName is provided
    if (!packageName) {
      return NextResponse.json({ error: "Package name is required." }, { status: 400 });
    }

    // Find the property by ID and ensure it's not deleted
    const property = await Property.findOne({ _id: params.id, isDeleted: false });
    if (!property) {
      return NextResponse.json({ error: "Property not found." }, { status: 404 });
    }

    // Ensure packages array is initialized
    property.packages = property.packages || [];

    // Check if a package with the same name already exists
    const existingPackageIndex = property.packages.findIndex((pkg) => pkg.packageName === packageName);

    if (existingPackageIndex !== -1) {
      // Package exists, update it
      if (packagePricePerDay !== undefined) {
        property.packages[existingPackageIndex].packagePricePerDay = packagePricePerDay;
      }
      if (packageDescription !== undefined) {
        property.packages[existingPackageIndex].packageDescription = packageDescription;
      }
      if (durationRequirementDays !== undefined) {
        property.packages[existingPackageIndex].durationRequirementDays = durationRequirementDays;
      }

      // Save the updated property with the modified package
      await property.save();

      return NextResponse.json({
        message: "Package updated successfully.",
        package: property.packages[existingPackageIndex]
      });
    } else {
      // Package does not exist, create a new one
      property.packages.push({
        packageName,
        packagePricePerDay,
        packageDescription,
        durationRequirementDays
      });

      // Save the updated property with the new package
      await property.save();

      return NextResponse.json({
        message: "Package added successfully.",
        package: property.packages.find((pkg) => pkg.packageName === packageName)
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};

