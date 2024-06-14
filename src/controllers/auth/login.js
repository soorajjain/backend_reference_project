import express, { Router } from "express";
import initTeacherModel from "../../model/teacherModel.js";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import constants from "../../config/constants.js";

router.post("/", async (req, res) => {
  try {
    const teacherModel = await initTeacherModel();

    const { email, password } = req.body;
    let response;

    if (!email || email == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      return res.json({
        code: response.code,
        msg: "mail" + response.msg,
      });
    }

    if (!password || password == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      return res.json({
        code: response.code,
        msg: "password" + response.msg,
      });
    }

    const isValidEmail = validator.isEmail(email);
    if (isValidEmail == false) {
      response = RESPONSE.INVALID_DATA;
      return res.json({
        code: response.code,
        msg: "email " + response.msg,
      });
    }

    const data = await teacherModel.findOne({
      is_active: constants.STATE.ACTIVE,
      email: email,
    });

    if (data && (await bcrypt.compare(password, data.password))) {
      const token = jwt.sign(
        {
          id: data._id,
          name: data.teacher_name,
        },
        process.env.TOKENKEY
      );

      response = RESPONSE.SUCCESS;
      return res.json({
        code: response.code,
        msg: response.msg,
        data: token,
      });
    } else {
      response = RESPONSE.INVALID_DATA;
      return res.json({
        code: response.code,
        msg: "login credentials" + response.msg,
      });
    }
    // await teacherModel.create({
    //   teacher_name: teacher_name,
    //   phone: phone,
    //   email: email,
    //   password: encryptedPassword,
    // });

    return res.json(RESPONSE.SUCCESS);
  } catch (error) {
    console.log(error);
    return res.json(RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
