import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message} | ${err.stack}`);
    process.exit(1);
  }
};

process.on("SIGTERM", async () => {
  console.log("Closing MongoDB connection.");
  await mongoose.connection.close();
  process.exit(0);
});

export default connectMongoDB;
