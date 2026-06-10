import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("URI:", process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Database Connected");
  } catch (error) {
    console.log("Mongo Error:", error);
  }
};

export default connectDB;