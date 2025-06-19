import mongoose from "mongoose";
import config from ".";

export async function connectToMongoDB() {
  try {
    await mongoose.connect(config.dbUri);
    console.log("Successfully connected to MongoDB!");
  } catch (err) {
    console.log("Error connecting to MongoDB!!", err);
    process.exit(1);
  }
}
