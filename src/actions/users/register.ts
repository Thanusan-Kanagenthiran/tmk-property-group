"use server";
import type { RegisterValues } from "@/interfaces/UserActions";
import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";
import bcrypt from "bcryptjs";

export const register = async (values: RegisterValues) => {
  const { email, password, name, role } = values;

  try {
    await dbConnect();
    const userFound = await User.findOne({ email });
    if (userFound) {
      if (userFound.isDeleted) {
        return {
          error: "User account has been deleted."
        };
      } else {
        return {
          error: "User already exists."
        };
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();
    return { message: "Registration successful with email: " + email + "as a " + role };
  } catch (e) {
    return {
      error: "An error occurred during registration."
    };
  }
};
