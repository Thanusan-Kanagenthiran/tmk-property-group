import { model, Schema } from "mongoose";

interface ReviewDocument {
  bookingId: Schema.Types.ObjectId;
  tenant: Schema.Types.ObjectId;
  host: Schema.Types.ObjectId;
  review: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

const ReviewSchema = new Schema<ReviewDocument>(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true
    },
    tenant: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    review: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true
    }
  },
  { timestamps: true, versionKey: false }
);

const Review = mongoose.models?.Review || model<ReviewDocument>("Review", ReviewSchema);
export default Review;
