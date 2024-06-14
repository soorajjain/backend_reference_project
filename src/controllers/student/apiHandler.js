import express from "express";
const router = express.Router();

import addStudent from "./addStudent.js";

router.use("/add_student", addStudent);

export default router;
