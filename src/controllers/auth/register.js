import express, { Router } from "express";
import initTeacherModel from "../../model/teacherModel.js";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import validator from "validator";
import bcrypt, { hash } from "bcrypt";
import HASH_ROUND from "../../config/constants.js";
import constants from "../../config/constants.js";

router.post("/", async (req, res) => {
  try {
    const teacherModel = await initTeacherModel();

    let response;

    const { teacher_name, email, phone, password } = req.body;

    console.log(teacher_name);

    if (!teacher_name || teacher_name == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      return res.json({
        code: response.code,
        msg: "tecaher name" + response.msg,
      });
    }
    if (!email || email == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      return res.json({
        code: response.code,
        msg: "mail" + response.msg,
      });
    }
    if (!phone || phone == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      return res.json({
        code: response.code,
        msg: "phone" + response.msg,
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

    const isValidPhone =
      validator.isMobilePhone(phone) && phone.toString().length == 10;
    if (isValidPhone == false) {
      response = RESPONSE.INVALID_DATA;
      return res.json({
        code: response.code,
        msg: "phone" + response.msg,
      });
    }

    const isExistingPhone = await teacherModel.find({
      is_active: constants.STATE.ACTIVE,
      phone: phone,
    });

    if (isExistingPhone.length > 0) {
      response = RESPONSE.ALREADY_EXISTS;
      return res.json({
        code: response.code,
        message: "phone" + response.msg,
      });
    }

    const isExistingEmail = await teacherModel.find({
      is_active: constants.STATE.ACTIVE,
      email: email,
    });

    if (isExistingEmail.length > 0) {
      response = RESPONSE.ALREADY_EXISTS;
      return res.json({
        code: response.code,
        message: "Email" + response.msg,
      });
    }

    // const HASH = 10;
    const encryptedPassword = await bcrypt.hash(password, constants.HASH_ROUND);
    console.log(encryptedPassword);

    await teacherModel.create({
      teacher_name: teacher_name,
      phone: phone,
      email: email,
      password: encryptedPassword,
    });

    return res.json(RESPONSE.SUCCESS);
  } catch (error) {
    console.log(error);
    return res.json(RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
