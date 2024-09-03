import { authUtils } from "@/lib/auth";
import dbConnect from "@/lib/db/dbConnect";
import Property from "@/lib/db/models/Properties/Property";
import PropertyType from "@/lib/db/models/Properties/PropertyType";
import Booking from "@/lib/db/models/Properties/Booking";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const propertyTypeName = searchParams.get("propertyType");
    const checkInDate = searchParams.get("checkIn");
    const checkOutDate = searchParams.get("checkOut");
    const region = searchParams.get("region");

    const filter: any = { isDeleted: false };

    if (propertyTypeName) {
      const propertyType = await PropertyType.findOne({ title: new RegExp(`^${propertyTypeName}$`, "i") })
        .select("_id")
        .lean()
        .exec();

      if (!propertyType) {
        return NextResponse.json({ message: "Property type not found." }, { status: 404 });
      }

      filter.propertyType = propertyType._id;
    }

    if (region) {
      filter.region = region;
    }

    // Convert date parameters to Date objects
    let checkIn: Date | null = checkInDate ? new Date(checkInDate) : null;
    let checkOut: Date | null = checkOutDate ? new Date(checkOutDate) : null;

    if (checkIn && checkOut) {
      // Fetch all properties first
      const allProperties = await Property.find(filter)
        .select("-host -isDeleted -createdAt -updatedAt")
        .populate("propertyType", "_id title")
        .populate({
          path: "bookings",
          select: "_id checkIn checkOut amount paymentStatus status"
        })
        .lean()
        .exec();

      // Filter out properties based on availability
      const properties = allProperties.filter((property: any) => {
        const unavailableDates = new Set<string>();

        property.bookings.forEach((booking: any) => {
          let current = new Date(booking.checkIn);
          const end = new Date(booking.checkOut);

          while (current <= end) {
            unavailableDates.add(current.toISOString().split("T")[0]); // Use only the date part
            current.setDate(current.getDate() + 1);
          }
        });

        // Check if the desired dates fall within unavailable dates
        for (let date = new Date(checkIn); date <= checkOut; date.setDate(date.getDate() + 1)) {
          if (unavailableDates.has(date.toISOString().split("T")[0])) {
            return false; // Property is not available for the entire range
          }
        }

        return true; 
      });

      const filteredPropertiesCount = properties.length;

      // Process properties to include unavailable dates
      const data = properties.map((property: any) => {
        const {
          _id,
          images,
          propertyType,
          bookings,
          title,
          description,
          noOfBeds,
          noOfBaths,
          maxNoOfGuests,
          pricePerNight
        } = property;

        // Calculate unavailable dates
        const unavailableDates = new Set<string>();

        bookings.forEach((booking: any) => {
          let current = new Date(booking.checkIn);
          const end = new Date(booking.checkOut);

          while (current <= end) {
            unavailableDates.add(current.toISOString().split("T")[0]); // Use only the date part
            current.setDate(current.getDate() + 1);
          }
        });

        return {
          id: _id,
          type: {
            id: propertyType._id,
            title: propertyType.title
          },
          image: images.length > 0 ? images[0].url : "",
          unavailableDates: Array.from(unavailableDates),
          title,
          description,
          noOfBeds,
          noOfBaths,
          maxNoOfGuests,
          pricePerNight
        };
      });

      // Return response with counts
      return NextResponse.json(
        {
          totalPropertiesCount: allProperties.length,
          filteredPropertiesCount,
          properties: data
        },
        { status: 200 }
      );
    } else {
      // If no checkIn and checkOut dates are provided, return all properties
      const totalPropertiesCount = await Property.countDocuments({ ...filter }).exec();
      const properties = await Property.find(filter)
        .select("-host -isDeleted -createdAt -updatedAt")
        .populate("propertyType", "_id title")
        .populate({
          path: "bookings",
          select: "_id checkIn checkOut amount paymentStatus status"
        })
        .lean()
        .exec();

      const filteredPropertiesCount = properties.length;

      // Process properties to include unavailable dates
      const data = properties.map((property: any) => {
        const { _id, images, propertyType, bookings, ...rest } = property;

        // Calculate unavailable dates
        const unavailableDates = new Set<string>();

        bookings.forEach((booking: any) => {
          let current = new Date(booking.checkIn);
          const end = new Date(booking.checkOut);

          while (current <= end) {
            unavailableDates.add(current.toISOString().split("T")[0]); // Use only the date part
            current.setDate(current.getDate() + 1);
          }
        });

        return {
          id: _id,
          propertyType: {
            id: propertyType?._id.toString(),
            title: propertyType?.title
          },
          image: images.length > 0 ? images[0].url : "",
          unavailableDates: Array.from(unavailableDates),
          ...rest
        };
      });

      // Return response with counts
      return NextResponse.json(
        {
          totalPropertiesCount,
          filteredPropertiesCount,
          properties: data
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const isHost = await authUtils.isPropertyOwner(request);
    if (!isHost) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const userId = await authUtils.getUserId(request);

    await dbConnect();
    const body = await request.json();
    const newProperty = new Property({
      ...body,
      host: userId
    });
    const savedProperty = await newProperty.save();

    // Return the property ID in a JSON response
    return NextResponse.json({ id: savedProperty._id.toString() }, { status: 201 });
  } catch (error) {
    console.error("POST Handler Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
