import express from "express";
const app = express();
const __dirname = path.resolve();
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/helper/databaseConnection.js";
import routes from "./routes.js";
import bcrypt from "bcrypt";
import path from "path";
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
routes(app);
connectDB();

app.listen(PORT, () => {
  console.log("port listening on ", PORT);
});
