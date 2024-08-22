import { model, Schema } from "mongoose";

export interface PropertyTypeDocument {
  name: string;
  description: string;
}

const PropertyTypeSchema = new Schema<PropertyTypeDocument>(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  { timestamps: true, versionKey: false }
);

const PropertyType = mongoose.models?.PropertyType || model<PropertyTypeDocument>("PropertyType", PropertyTypeSchema);
export default PropertyType;
