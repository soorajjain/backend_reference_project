//for ref how to merge both litstud and listbyid

//it will be more good if less apis are there

import express from "express";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import initTeacherModel from "../../model/teacherModel.js";

//this ? allows that id is optional
router.get("/:id?", async (req, res) => {
  try {
    const teacherModel = await initTeacherModel();
    let response;
    let data;
    const teacher_id = req.params.id;
    if (teacher_id) {
      data = await teacherModel.findOne({
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
          message: "student" + response.msg,
        });
      }
    } else {
      data = await teacherModel.find({
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
    }
  } catch (error) {
    console.log("list teacher", error);
    return res.json(RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
