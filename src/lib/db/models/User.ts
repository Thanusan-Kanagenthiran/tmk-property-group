import mongoose, { Schema, Model, model } from "mongoose";

export interface UserDocument {
  email: string;
  password: string;
  name: string;
  phone?: string;
  image?: {
    url: string;
    public_id: string;
  };
  role: "admin" | "user" | "host";
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: [true, "Password is required"] },
    name: { type: String, required: [true, "Name is required"] },
    phone: {
      type: String,
      unique: true,
      sparse: true,
      match: [/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/, "Please enter a valid phone number"]
    },
    image: {
      url: { type: String },
      public_id: { type: String }
    },
    role: { type: String, enum: ["admin", "user", "host"], default: "user" },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true, versionKey: false }
);

const User: Model<UserDocument> = mongoose.models.User || model<UserDocument>("User", UserSchema);

export default User;
