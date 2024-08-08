"use server"
import { connectDB } from "@/lib/connection";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const register = async (values: any) => {
	const { email, password, name, phone, image, role } = values;

	try {
			await connectDB();
			const userFound = await User.findOne({ email });
			if(userFound){
					return {
							error: 'Email already exists!'
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

	}catch(e){
			console.log(e);
	}
}