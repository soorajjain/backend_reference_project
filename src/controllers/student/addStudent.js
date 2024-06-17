import express from "express";
import multer from "multer";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import authenticate from "../../middleware/authenticate.js";
import image from "../../middleware/uploads.js";
const uploads = image.array("image", 2);
import initStudentModel from "../../model/studentModel.js";

router.post("/", authenticate, async (req, res) => {
  try {
    uploads(req, res, async (err) => {
      let response;
      // console.log(req.files);  image data files
      if (!req.files || req.files == "") {
        response = RESPONSE.MANDATORY_PARAMS;
        return res.json({
          code: response.code,
          msg: "image" + response.msg,
        });
      } else if (err instanceof multer.MulterError) {
        return res.json(RESPONSE.MULTER_ERR);
      }

      if (err) {
        return res.json(RESPONSE.UNKNOWN_ERROR);
      }
      // console.log(req.files);
      let fileName = [];

      if (req.files != null) {
        req.files.forEach((ele) => {
          fileName.push(ele.filename);
        });
      }
      // console.log(fileName);

      const studentModel = await initStudentModel();
      const { student_name, rollno } = req.body;

      // data from the token to get taecher id in student data
      console.log(req.user);

      const teacher_id = req.user.id;

      if (!student_name || student_name == "") {
        response = RESPONSE.MANDATORY_PARAMS;
        return res.json({
          code: response.code,
          msg: "student_name" + response.msg,
        });
      }
      if (!rollno || rollno == "") {
        response = RESPONSE.MANDATORY_PARAMS;
        return res.json({
          code: response.code,
          msg: "rollno" + response.msg,
        });
      }
      await studentModel.create({
        student_name: student_name,
        rollno: rollno,
        image: fileName,
        teacher_id: teacher_id,
      });

      return res.json(RESPONSE.SUCCESS);
    });
  } catch (error) {
    console.log(error);
    return res.json(RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
