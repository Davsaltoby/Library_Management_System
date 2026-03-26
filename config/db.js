import mongoose from "mongoose";

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME || "Library-Management-System";

const connectToDb = async () => {
  try {
    await mongoose.connect(uri);

    console.log(`Connected to MongoDB: ${dbName}`);

    //graceful shutdown

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB Connection closed");
      process.exit(0);
    });
  } catch (error) {
    console.log(error);

    //exit when error
    process.exit(1);
  }
};

export default connectToDb;
