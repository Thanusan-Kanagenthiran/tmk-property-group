import { Schema, model, models, Document } from "mongoose";

interface IProperty extends Document {
  title: string;
  description: string;
  price: string;
  link: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
  packageType: string;
  location: string;
  id: string;
}

const PropertySchema = new Schema<IProperty>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  packageType: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true
  }
});


const Property = models.Property || model<IProperty>("Property", PropertySchema);

export default Property;
