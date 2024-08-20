import mongoose from "mongoose"

const Schema = mongoose.Schema;

const ImageSchema = new Schema(
  {
    image_url: {
      type: String,
      required: true
    },
    public_id: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const ImageModel = mongoose.models.Image || mongoose.model("Image", ImageSchema);
