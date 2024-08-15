import { Schema, model, Document } from "mongoose";
import { PaymentStatus } from "@/constants/Property";

interface IBooking extends Document {
  property: Schema.Types.ObjectId;
  tenant: Schema.Types.ObjectId;
  bookingDate: Date;
  checkInDate: Date;
  checkOutDate?: Date; 
  paymentStatus: PaymentStatus;
  additionalNotes?: string;
}

const BookingSchema = new Schema<IBooking>({
  property: { type: Schema.Types.ObjectId, ref: "Property", required: true },
  tenant: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bookingDate: { type: Date, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date },
  paymentStatus: {
    type: String,
    enum: Object.values(PaymentStatus),
    required: true,
  },
  additionalNotes: { type: String },
});

const Booking = model<IBooking>("Booking", BookingSchema);

export { Booking };