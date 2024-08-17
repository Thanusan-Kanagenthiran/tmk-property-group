import { REGEX_PATTERNS } from "@/constants/RegexPatterns";
import { UserRole } from "@/constants/Users";
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
      match: [REGEX_PATTERNS.EMAIL, "Email is invalid"]
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      match: [REGEX_PATTERNS.NAME, "Name can only contain letters and spaces"]
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
      match: [REGEX_PATTERNS.PHONE, "Phone number is invalid"]
    },
    image: {
      type: String,
      sparse: true
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);
export default User;
