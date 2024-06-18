import express from "express";
const router = express.Router();

import addStudent from "./addStudent.js";
import listStudent from "./listStudent.js";
import listStudentById from "./listStudentById.js";
import list from "./list.js";

router.use("/add_student", addStudent);
router.use("/list_student", listStudent);
router.use("/list_student_by_id", listStudentById);
router.use("/list_both", list);

export default router;
