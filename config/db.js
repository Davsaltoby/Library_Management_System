import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME || "Library-Management-System";

const client = new MongoClient(uri);

const connectToDb = async () => {
  try {
    await client.connect();

    console.log(`Connected to MongoDB: ${dbName}`);

    //graceful shutdown

    process.on("SIGINT", async () => {
      await client.close();
      console.log("MongoDB connection closed");
      process.exit(0);
    });

    const dbConnection = client.db(dbName);

    return dbConnection;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export default connectToDb;
