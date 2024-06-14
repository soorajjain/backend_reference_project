import mongoose from "mongoose";
const teacherModel = {
  teacher_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_active: {
    type: String,
    default: 1,
  },
};

let teacher = null;
const initTeacherModel = async () => {
  try {
    if (teacher) return teacher;
    teacher = mongoose.model("teachermodel", teacherModel);
    return teacher;
  } catch (error) {
    console.log("teacher_model", error);
  }
};

export default initTeacherModel;
