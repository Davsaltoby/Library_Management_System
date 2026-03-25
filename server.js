import "dotenv/config";
import express from "express";
import connectToDb from "./config/db.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    app.locals.db = await connectToDb();

    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
