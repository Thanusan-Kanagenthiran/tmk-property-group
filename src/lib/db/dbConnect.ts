import mongoose from "mongoose";
const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

export const dbConnect = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI as string);
    if (connection.readyState === 1) {
      return true;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default dbConnect;
