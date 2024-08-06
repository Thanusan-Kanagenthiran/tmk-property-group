import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const DbConnect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Database connection is already open");
    return;
  }

  if (connectionState === 2) {
    console.log("Database connection is in progress");
    return;
  }

  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }
    await mongoose.connect(MONGODB_URI);
    console.log("Database connection established");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};
