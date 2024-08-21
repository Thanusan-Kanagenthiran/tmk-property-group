import mongoose, { Schema, model } from "mongoose";

export interface PropertyDocument {
  propertyType: Schema.Types.ObjectId;
  title: string;
  description: string;

  address: string;
  region: string;

  area: string;
  noOfRooms: string;
  noOfBeds: string;
  noOfBaths: string;

  pricePerNight: number;
  packages: {
    packageName: string;
    packagePricePerDay: number;
    durationRequirementDays?: {
      daysOrWeeks: string;
      count: string;
    };
  }[];

  images: {
    url: string;
    public_id: string;
  }[];

  amenities: string[];
  host: Schema.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

const PropertySchema = new Schema<PropertyDocument>(
  {
    propertyType: {
      type: Schema.Types.ObjectId,
      ref: "PropertyType",
      required: true
    },

    title: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    region: { type: String, required: true },

    noOfRooms: { type: String, required: true },
    noOfBeds: { type: String, required: true },
    noOfBaths: { type: String, required: true },
    area: { type: String, required: true },
    amenities: { type: [String], required: true },

    pricePerNight: { type: Number, required: true },
    packages: [
      {
        packageName: { type: String, required: true },
        packagePricePerDay: { type: Number, required: true },
        durationRequirementDays: {
          daysOrWeeks: { type: String },
          count: { type: String }
        }
      }
    ],
    images: [{ url: { type: String }, public_id: { type: String } }],
    host: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Property = mongoose.models?.Property || model<PropertyDocument>("Property", PropertySchema);
export default Property;
