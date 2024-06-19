import express from "express";
const router = express.Router();

import addStudent from "./addStudent.js";
import listStudent from "./listStudent.js";
import listStudentById from "./listStudentById.js";
import list from "./list.js";
import editStudent from "./editStudent.js";
import deleteStudent from "./deleteStudent.js";


router.use("/add_student", addStudent);
router.use("/list_student", listStudent);
router.use("/list_student_by_id", listStudentById);
router.use("/list_both", list);
router.use("/edit_student", editStudent);
router.use("/delete_student", deleteStudent);


export default router;
