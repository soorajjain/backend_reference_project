import express from "express";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import initTeacherModel from "../../model/teacherModel.js";

router.get("/:id", async (req, res) => {
  try {
    const teacherModel = await initTeacherModel();
    let response;
    //params is what we are pasiing data using url
    const teacher_id = req.params.id;

    //this find stores data in array but findOne stores data in object
    //using to get data that are with teacher id
    let data = await teacherModel.findOne({
      is_active: constants.STATE.ACTIVE,
      _id: teacher_id,
    });

    if (data) {
      data = {
        _id: data._id,
        teacher_name: data.teacher_name,
        email: data.email,
        phone: data.phone,
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
        message: "teacher" + response.msg,
      });
    }
  } catch (error) {
    console.log("list teacher", error);
    return res.json(RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
