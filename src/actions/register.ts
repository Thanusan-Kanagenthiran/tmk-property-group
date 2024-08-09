"use server"
import { connectDB } from "@/lib/connection";
import User from "@/models/User";
import bcrypt from "bcryptjs";

interface RegisterValues {
	email: string;
	password: string;
	name: string;
	phone?: string;
	image?: string;
	role?: string;
}

interface RegisterResponse {
	user?: typeof User.prototype;
	error?: string;
}

export const register = async (values: RegisterValues): Promise<RegisterResponse> => {
	const { email, password, name, phone, image, role } = values;

	try {
			await connectDB();
			const userFound = await User.findOne({ email });
			if (userFound) {
					return {
							error: 'Email already exists!'
					};
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