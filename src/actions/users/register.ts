"use server"
import type { RegisterValues } from "@/interfaces/UserActions";
import { connectDB } from "@/lib/connection";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const register = async (values: RegisterValues) => {
	const { email, password, name, phone, image, role } = values;

	try {
			await connectDB();
			const userFound = await User.findOne({ email });
			if (userFound) {
				if (userFound.isDeleted) {
					return {
						error: 'User account has been deleted.'
					};
				} else {
					return {
						error: 'User already exists.'
					};
				}
			}

			const hashedPassword = await bcrypt.hash(password, 10);
			const user = new User({
					name,
					email,
					password: hashedPassword,
					phone,
					image,
					role
			});

			const savedUser = await user.save();
			return { user: savedUser };
	} catch (e) {
			console.error('Registration Error:', e);
			return {
					error: 'An error occurred during registration.'
			};
	}
}