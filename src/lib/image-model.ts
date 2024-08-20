import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ImageSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      image_url: {
        type: String
      },
      public_id: {
        type: String
      }
    }
  },
  {
    timestamps: true
  }
);

export const UserModelWithImage = mongoose.models.Image || mongoose.model("Image", ImageSchema);
