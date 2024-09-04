import mongoose, { model, Model, Schema, Types } from "mongoose";

export interface PropertyTypeDocument {
  title: "home" | "apartment" | "villa" | "farmhouse" | "condo" | "townhouse" | "duplex" | "studio" | "chalet";
  description: string;
  iconKey: string;
}

const PropertyTypeSchema = new Schema<PropertyTypeDocument>(
  {
    title: { type: String, required: true, enum: ["standard", "deluxe", "premium"] },
    description: { type: String, required: true },
    iconKey: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

const PropertyType: Model<PropertyTypeDocument> =
  mongoose.models.PropertyType || model<PropertyTypeDocument>("PropertyType", PropertyTypeSchema);

export default PropertyType;
