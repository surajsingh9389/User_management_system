import mongoose from "mongoose";

// Function to connect MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/userManagementSystem`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);

    // Stop server if DB connection fails
    process.exit(1);
  }
};

export default connectDB;
