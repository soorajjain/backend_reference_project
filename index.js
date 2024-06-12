import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/helper/databaseConnection.js";

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
app.listen(PORT, () => {
  console.log("port listening on ", PORT);
});
