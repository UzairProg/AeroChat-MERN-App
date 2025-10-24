import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  }
  catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // 1 indicates failure, 0 indicates success
  }
};

export default connectDB;
