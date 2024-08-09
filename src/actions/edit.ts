"use server"
import { connectDB } from "@/lib/connection";
import User from "@/models/User";

interface EditUserValues {
	_id: string;
  email: string;
  name?: string;
  phone?: string;
  image?: string;
  role?: string;
}

interface EditUserResponse {
  user?: typeof User.prototype;
  error?: string;
}

export const editUser = async (values: EditUserValues): Promise<EditUserResponse> => {
  const { _id, email, name, phone, image, role } = values;

  try {
    await connectDB();

    const user = await User.findOne({ _id });
    if (!user) {
      return {
        error: 'User not found!'
      };
    }
		if(email !== undefined) user.email = email;
    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (image !== undefined) user.image = image;
    if (role !== undefined) user.role = role;

    const updatedUser = await user.save();
    return { user: updatedUser };
  } catch (e) {
    console.error('Edit User Error:', e);
    return {
      error: 'An error occurred while editing the user.'
    };
  }
}
