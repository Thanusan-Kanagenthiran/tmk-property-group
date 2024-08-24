import mongoose, { model, Model, Schema, Types } from "mongoose";

export interface PropertyDocument {
  propertyType: Types.ObjectId;
  host: Types.ObjectId;

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
    packageDescription: string;
    durationRequirementDays?: {
      daysOrWeeks: "days" | "weeks";
      count: number;
    };
  }[];

  images?: {
    url: string;
    public_id: string;
  }[];

  bookings?: Types.ObjectId[];
  reviews?: Types.ObjectId[];
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
        packageDescription: { type: String },
        durationRequirementDays: {
          daysOrWeeks: { type: String, enum: ["days", "weeks"], required: true },
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
    status: { type: String, enum: ["active", "inactive", "suspended"], default: "active" },
    remarks: { type: String }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Property: Model<PropertyDocument> =
  mongoose.models.Property || model<PropertyDocument>("Property", PropertySchema);

export default Property;
