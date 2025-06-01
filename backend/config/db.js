import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
  const {connection} = await mongoose.connect(process.env.MONGO_URL);
  console.log(`MongoDB connected: ${connection.host}`)
  } catch (error) {
    console.error('Error Message', error.message);
    process.exit(1)
  }
}