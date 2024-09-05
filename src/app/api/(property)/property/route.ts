import { authUtils } from "@/lib/auth";
import dbConnect from "@/lib/db/dbConnect";
import Property from "@/lib/db/models/Properties/Property";
import PropertyType from "@/lib/db/models/Properties/PropertyType";
import { NextResponse, type NextRequest } from "next/server";

const getUnavailableDates = (bookings: any[]): Set<string> => {
  const unavailableDates = new Set<string>();
  bookings.forEach((booking: any) => {
    let current = new Date(booking.checkIn);
    const end = new Date(booking.checkOut);

    while (current <= end) {
      unavailableDates.add(current.toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }
  });
  return unavailableDates;
};

const filterPropertiesByDate = (properties: any[], checkIn: Date, checkOut: Date) => {
  return properties.filter((property: any) => {
    const unavailableDates = getUnavailableDates(property.bookings);
    for (let date = new Date(checkIn); date <= checkOut; date.setDate(date.getDate() + 1)) {
      if (unavailableDates.has(date.toISOString().split("T")[0])) {
        return false;
      }
    }
    return true;
  });
};

const formatPropertyData = (property: any, isHost: boolean, isAdmin: boolean, isAuthenticated: boolean) => {
  const { _id, images, propertyType, bookings, title, description, noOfBeds, noOfBaths, maxNoOfGuests, pricePerNight, host } = property;

  const unavailableDates = getUnavailableDates(bookings);

  const commonData = {
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

  const extraData = {
    ...(isHost && bookings.length > 0 ? { bookings } : {}),
    ...(isAdmin && host ? { host } : {})
  };

  if (!isAuthenticated) {
    return commonData;
  }

  return { ...commonData, ...extraData };
};


export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const propertyTypeName = searchParams.get("propertyType");
    const checkInDate = searchParams.get("checkIn");
    const checkOutDate = searchParams.get("checkOut");
    const region = searchParams.get("region");

    let isHost = false, isAdmin = false, isAuthenticated = false;
    try {
      isHost = await authUtils.isPropertyOwner(request);
      isAdmin = await authUtils.isAdmin(request);
      isAuthenticated = true;
    } catch (error) {
      console.warn("User is not authenticated or an error occurred during authentication:", error);
      isAuthenticated = false;
    }

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

    let checkIn: Date | null = checkInDate ? new Date(checkInDate) : null;
    let checkOut: Date | null = checkOutDate ? new Date(checkOutDate) : null;
    if (checkIn && isNaN(checkIn.getTime())) checkIn = null;
    if (checkOut && isNaN(checkOut.getTime())) checkOut = null;

    if (checkIn && checkOut) {
      const allProperties = await Property.find(filter)
        .select("-isDeleted -createdAt -updatedAt -reviews -packages -amenities")
        .populate("propertyType", "_id title")
        .populate({
          path: "bookings",
          select: "_id checkIn checkOut amount paymentStatus status"
        })
        .lean()
        .exec();

      const properties = filterPropertiesByDate(allProperties, checkIn, checkOut);
      const filteredPropertiesCount = properties.length;

      const data = properties.map((property: any) =>
        formatPropertyData(property, isHost, isAdmin, isAuthenticated)
      );

      return NextResponse.json(
        {
          totalPropertiesCount: allProperties.length,
          filteredPropertiesCount,
          properties: data
        }
      );
    } else {
      const totalPropertiesCount = await Property.countDocuments({ ...filter }).exec();
      const properties = await Property.find(filter)
        .select("-isDeleted -createdAt -updatedAt -reviews -packages -amenities")
        .populate("propertyType", "_id title")
        .populate({
          path: "bookings",
          select: "_id checkIn checkOut amount paymentStatus status"
        })
        .lean()
        .exec();

      const filteredPropertiesCount = properties.length;

      const data = properties.map((property: any) =>
        formatPropertyData(property, isHost, isAdmin, isAuthenticated)
      );

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

    return NextResponse.json({ id: savedProperty._id.toString() }, { status: 201 });
  } catch (error) {
    console.error("POST Handler Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
