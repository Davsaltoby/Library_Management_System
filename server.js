import "dotenv/config";
import express from "express";
import connectToDb from "./config/db.js";
import authorRoutes from "./routes/authorsRoute.js";
import bookRoutes from "./routes/booksRoute.js";
import studentRoutes from "./routes/studentsRoute.js";
import libraryAttendantRoutes from "./routes/libraryAttendantsRoute.js";

const app = express();

app.use(express.json());

app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);
app.use("/students", studentRoutes);
app.use("/attendants", libraryAttendantRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectToDb();

    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
