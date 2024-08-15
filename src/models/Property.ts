import mongoose, { Schema, model } from "mongoose";
import { PropertyType, PropertyPackageTypes, PropertyStatus } from "@/constants/Property";

export interface PropertyDocument {
  title: string;
  description: string;
  price: number;
  link: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
  packageType: PropertyPackageTypes;
  amenities: string[];
  propertyType: PropertyType;
  location: string;
  status: PropertyStatus;
  owner: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
const PropertySchema = new Schema<PropertyDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    link: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    image: { type: String, required: true },
    packageType: {
      type: String,
      enum: Object.values(PropertyPackageTypes),
      required: true,
    },
    location: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(PropertyStatus),
      required: true,
    },
    propertyType: {
      type: String,
      enum: Object.values(PropertyType),
      required: true,
    },
    amenities: { type: [String], required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Property = mongoose.models?.Property || model<PropertyDocument>("Property", PropertySchema);
export default Property;
