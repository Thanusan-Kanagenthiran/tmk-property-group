
import { NextRequest, NextResponse } from "next/server";

const propertyPackagesData = {
  data: [
    {
      id: 1,
      title: "STANDARD",
      description: "The standard Lorem Ipsum passage, used since the 1500s"
    },
    {
      id: 2,
      title: "DELUXE",
      description: "The deluxe Lorem Ipsum passage, with more features"
    },
    {
      id: 3,
      title: "PREMIUM",
      description: "The premium Lorem Ipsum passage, with the best features"
    }
  ]
};

export async function GET(request: NextRequest) {
  return NextResponse.json(propertyPackagesData, { status: 200 });
}
