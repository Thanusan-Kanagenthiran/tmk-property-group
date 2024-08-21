// app/api/property/packages/route.ts

import { NextRequest, NextResponse } from "next/server";

const propertyTypeData = {
  data: [
    {
      id: 1,
      title: "APARTMENT",
      description: "Furnished and self-catering accommodations where guests rent the entire place.",
      icon: "LocationCityIcon"
    },
    {
      id: 2,
      title: "HOUSE",
      description: "Properties like apartments, vacation homes, villas, etc. List your property.",
      icon: "VillaIcon"
    },
    {
      id: 3,
      title: "VILLA",
      description: "Properties like hotels, B&Bs, guest houses, hostels, condo hotels, etc. List your property.",
      icon: "StorefrontIcon"
    },
    {
      id: 4,
      title: "Hotel",
      description: "Alternative Places Properties like boats, campgrounds, luxury tents, etc. add for.",
      icon: "NightShelterIcon"
    }
  ]
};

export async function GET(request: NextRequest) {
  return NextResponse.json(propertyTypeData, { status: 200 });
}
