import mongoose, { Schema } from "mongoose";
const studentModel = {
  student_name: {
    type: String,
    required: true,
  },
  rollno: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
    // data: buffer,
    required: true,
  },
  teacher_id: {
    type: Schema.Types.ObjectId,
    ref: "teacherdata",
  },
  is_active: {
    type: String,
    default: 1,
  },
};

let student = null;
const initStudentModel = async () => {
  try {
    if (student) return student;
    student = mongoose.model("student_model", studentModel);
    return student;
  } catch (error) {
    console.log("student_model", error);
  }
};

export default initStudentModel;
