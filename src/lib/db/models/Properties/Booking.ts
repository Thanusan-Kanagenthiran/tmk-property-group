import { model, Schema } from "mongoose";

interface BookingDocument {
  tenantId: Schema.Types.ObjectId;
  propertyId: Schema.Types.ObjectId;
  hostId: Schema.Types.ObjectId;
  amount: number;
  checkIn: Date;
  checkOut: Date;
  paymentStatus: "pending" | "paid";
  paymentDate?: Date;
  approvedDate?: Date;
  cancelledDate?: Date;
  canceledReason?: string;
  status: "pending" | "accepted" | "rejected" | "cancelled" | "completed" | "partially_completed";
  partiallyCompletedReason?: string;
}

const BookingSchema = new Schema<BookingDocument>(
  {
    tenantId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    amount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
    paymentDate: Date,
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "cancelled", "completed", "partially_completed"],
      default: "pending"
    },
    partiallyCompletedReason: String,
    approvedDate: Date,
    cancelledDate: Date,
    canceledReason: String,
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    hostId: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true, versionKey: false }
);

const Booking = mongoose.models?.Booking || model<BookingDocument>("Booking", BookingSchema);
export default Booking;
