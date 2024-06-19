import express from "express";
import multer from "multer";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import authenticate from "../../middleware/authenticate.js";
import initTeacherModel from "../../model/teacherModel.js";

router.get("/", authenticate, async (req, res) => {
  try {
    const teacherModel = await initTeacherModel();
    let response;
    //this find stires data in array but find one stores data in object
    //using to get data that are with teacher id

    let data = await teacherModel.find({
      is_active: constants.STATE.ACTIVE,
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
          teacher_name: item.teacher_name,
          email: item.email,
          phone: item.phone,
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
