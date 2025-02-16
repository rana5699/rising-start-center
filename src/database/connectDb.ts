import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.DATABASEURL}`);
    console.log('DB Connected Successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};
