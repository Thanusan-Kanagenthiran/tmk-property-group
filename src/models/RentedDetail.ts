import { Schema, model, Document } from "mongoose";

interface IRentedDetail extends Document {
  property: Schema.Types.ObjectId;
  booking: Schema.Types.ObjectId;
  rentAmount: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
  isActive: boolean;
}

const PropertyRentedSchema = new Schema<IRentedDetail>({
  property: { type: Schema.Types.ObjectId, ref: "Property", required: true },
  booking: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
  rentAmount: { type: Number, required: true },
  leaseStartDate: { type: Date, required: true },
  leaseEndDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
});

const PropertyRented = model<IRentedDetail>("PropertyRented", PropertyRentedSchema);

export { PropertyRented };