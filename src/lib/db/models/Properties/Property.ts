import mongoose, { Schema, model } from "mongoose";

export interface PropertyDocument {
  propertyType: Schema.Types.ObjectId;
  host: Schema.Types.ObjectId;

  title: string;
  description: string;
  address: string;
  region: string;

  noOfBeds: number;
  noOfBaths: number;
  maxNoOfGuests: number;

  amenities: string[];

  pricePerNight: number;
  packages?: {
    packageName: string;
    packagePricePerDay: number;
    durationRequirementDays?: {
      daysOrWeeks: "days" | "weeks";
      count: number;
    };
  }[];

  images?: {
    url: string;
    public_id: string;
  }[];

  bookings?: Schema.Types.ObjectId[];
  reviews?: Schema.Types.ObjectId[];
  isDeleted: boolean;
  status?: "active" | "inactive" | "suspended";
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema = new Schema<PropertyDocument>(
  {
    propertyType: { type: Schema.Types.ObjectId, ref: "PropertyType", required: true },
    host: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    region: { type: String, required: true },
    noOfBeds: { type: Number, required: true },
    noOfBaths: { type: Number, required: true },
    maxNoOfGuests: { type: Number, required: true },
    pricePerNight: { type: Number, required: true },
    amenities: { type: [String], required: true },
    packages: [
      {
        packageName: { type: String, required: true },
        packagePricePerDay: { type: Number, required: true },
        durationRequirementDays: {
          daysOrWeeks: { type: String, required: true },
          count: { type: Number, required: true }
        }
      }
    ],
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true }
      }
    ],
    bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    isDeleted: { type: Boolean, required: true, default: false },
    status: { type: String, required: true, default: "active" },
    remarks: { type: String, required: false }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Property = mongoose.models?.Property || model<PropertyDocument>("Property", PropertySchema);
export default Property;
