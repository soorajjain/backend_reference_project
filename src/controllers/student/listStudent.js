import express from "express";
import multer from "multer";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import authenticate from "../../middleware/authenticate.js";

import initStudentModel from "../../model/studentModel.js";

router.get("/", authenticate, async (req, res) => {
  try {
    const studentModel = await initStudentModel();
    const teacher_id = req.user.id;
    let response;
    //this find stires data in array but find one stores data in object
    //using to get data that are with teacher id

    let data = await studentModel.find({
      is_active: constants.STATE.ACTIVE,
      teacher_id: teacher_id,
    });

    console.log(data.length);
    if (data.length == 0) {
      response = RESPONSE.NOT_FOUND;

      return res.json({
        code: response.code,
        message: "data" + response.msg,
      });
    } else {
      //there are multiple data inside file we need to filter using map
      data = data.map((item) => {
        return {
          _id: item._id,
          student_name: item.student_name,
          rollno: item.rollno,
          //we are now getting image in the form of array we need to convert
          //this upload is not a entite path extenal path is defined in the index
          image: item.image.map((img) => "/uploads/" + img),
        };
      });
      response = RESPONSE.SUCCESS;
      return res.json({
        code: response.code,
        msg: response.msg,
        data: data,
      });
    }
  } catch (error) {
    console.log("list Student", error);
    return res.json(RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
