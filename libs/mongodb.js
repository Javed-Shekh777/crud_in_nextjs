import mongoose from "mongoose";

const conectMongoDB =async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(`Database connected to `);
  } catch (error) {
    console.log(`Db connection error : ${error}`);
  }
};


export default conectMongoDB;