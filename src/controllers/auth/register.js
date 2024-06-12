import express, { Router } from "express";
import initTeacherModel from "../../model/teacherModel.js";
const router = express.Router();

Router.post("/"),
  async (req, res) => {
    try {
      const teacherModel = await initTeacherModel();
      const { teacher_name, email, phone, password } = req.body;
    } catch (error) {
      console.log(error);
    }
  };
