import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ImageSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    image: {
      image_url: {
        type: String,
        required: true
      },
      public_id: {
        type: String,
        required: true
      }
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      verbose: true
    }
  },
  {
    timestamps: true
  }
);

export const ImageModel = mongoose.models.Image || mongoose.model("Image", ImageSchema);
