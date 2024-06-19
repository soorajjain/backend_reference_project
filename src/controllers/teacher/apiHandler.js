import express from "express";
const router = express.Router();

import listTeacher from "./listTeacher.js";
import editTeacher from "./editTeacher.js";
import listTeacherById from "./listTeacherById.js";
import listBoth from "./list.js";

router.use("/list_teacher", listTeacher);
router.use("/edit_teacher", editTeacher);
router.use("/list_teacher_by_id", listTeacherById);
router.use("/list_both", listBoth);

export default router;
