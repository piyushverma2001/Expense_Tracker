import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    if (process.env.NODE_ENV === "development") {
      console.error(err.stack);
    }
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  console.log("Gracefully shutting down MongoDB connection...");
  await mongoose.connection.close();
  process.exit(0);
});

export default connectDB;
