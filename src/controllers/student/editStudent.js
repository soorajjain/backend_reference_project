//for ref how to merge both litstud and listbyid

//it will be more good if less apis are there

import express from "express";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import authenticate from "../../middleware/authenticate.js";

import initStudentModel from "../../model/studentModel.js";

//this ? allows that id is optional
router.put("/:id", authenticate, async (req, res) => {
  try {
    const studentModel = await initStudentModel();
    const teacher_id = req.user.id;
    let response;
    const student_id = req.params.id; //take the id thats there in get method in the top -/:id?
    const { student_name, rollno } = req.body;
    let updates = {};
    const isValidId = await studentModel.findOne({
      _id: student_id,
      is_active: constants.STATE.ACTIVE,
      teacher_id: teacher_id,
    });
    if (!isValidId) {
      response = RESPONSE.INVALID_DATA;
      return res.json({
        code: response.code,
        msg: "ID" + response.msg,
      });
    }

    if (student_name && student_name != "") {
      updates.student_name = student_name;
    }
    if (rollno && rollno != "") {
      updates.rollno = rollno;
    }
    return res.json(RESPONSE.SUCCESS);
  } catch (error) {
    console.log("edit student page : ", error);
    return res.json(RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
