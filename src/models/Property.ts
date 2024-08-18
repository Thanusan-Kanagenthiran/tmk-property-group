import mongoose, { Schema, model } from "mongoose";
import { PropertyType, PropertyPackageTypes } from "@/constants/Property";

export interface PropertyDocument {
  packageType: string;
  propertyType: string;

  title: string;
  description: string;
  location: string;
  address: string;

  noOfRooms: string;
  noOfBeds: string;
  noOfBaths: string;
  area: string;

  amenities: string[];

  owner: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export interface PropertyPostData extends Omit<PropertyDocument, "owner" | "createdAt" | "updatedAt"> {}

const PropertySchema = new Schema<PropertyDocument>(
  {
    packageType: {
      type: String,
      required: true
    },
    propertyType: {
      type: String,
      required: true
    },

    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    address: { type: String, required: true },

    noOfRooms: { type: String, required: true },
    noOfBeds: { type: String, required: true },
    noOfBaths: { type: String, required: true },
    area: { type: String, required: true },
    amenities: { type: [String], required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Property = mongoose.models?.Property || model<PropertyDocument>("Property", PropertySchema);
export default Property;
