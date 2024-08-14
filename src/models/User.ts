import { UserRole } from "@/app/constants/Users";
import mongoose, { Schema, model } from "mongoose";

export interface UserDocument {
  email: string;
  password: string;
  name: string;
  phone?: string;
  image?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is invalid"],
    },
    password: { type: String, required: [true, "Password is required"] },
    name: { type: String, required: [true, "Name is required"] },
    phone: { type: String, unique: true, match: [/^\d{10}$/, "Phone number is invalid"] },
    image: { type: String },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);
export default User;
