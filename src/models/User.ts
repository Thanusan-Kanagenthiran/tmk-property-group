import  mongoose, { Schema, model } from  "mongoose";

export interface UserDocument {
  _id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  image?: string;
	role?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>({
	email: {
		type: String,
		unique: true,
		required: [true, "Email is required"],
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Email is invalid",
		],
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: [true, "Name is required"]
	},
	phone: {
		type: String,
	},
	image: {
		type: String,
	},
	role: {
		type: String,
		default: "user"
	}
},
{
	timestamps: true,
}
);

const  User  =  mongoose.models?.User  ||  model<UserDocument>('User', UserSchema);
export  default  User;