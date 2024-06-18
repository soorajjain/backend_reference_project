import express from "express";
import multer from "multer";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import authenticate from "../../middleware/authenticate.js";

import initStudentModel from "../../model/studentModel.js";

router.get("/:id", authenticate, async (req, res) => {
  try {
    const studentModel = await initStudentModel();
    const teacher_id = req.user.id;
    let response;
    //params is what we are pasiing data using url
    const student_id = req.params.id;
    console.log(req.params.id);

    //this find stores data in array but findOne stores data in object
    //using to get data that are with teacher id
    let data = await studentModel.findOne({
      is_active: constants.STATE.ACTIVE,
      teacher_id: teacher_id,
      _id: student_id,
    });

    if (data) {
      data = {
        _id: data._id,
        student_name: data.student_name,
        rollno: data.rollno,
        //we are now getting image in the form of array we need to convert
        //this upload is not a entite path extenal path is defined in the index
        image: data.image.map((img) => "/uploads/" + img),
      };

      response = RESPONSE.SUCCESS;
      return res.json({
        code: response.code,
        msg: response.msg,
        data: data,
      });
    } else {
      response = RESPONSE.NOT_FOUND;

      return res.json({
        code: response.code,
        message: "student" + response.msg,
      });
    }
  } catch (error) {
    console.log("list Student", error);
    return res.json(RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
