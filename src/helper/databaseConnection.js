import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
  try {
    // compass
    const url = "mongodb://127.0.0.1:27017/project_teacher_db";
    await mongoose.connect(url);

    // atlas
    // const url1 = "mongodb+srv://soorajjain51:WccFrKht26HvzaUD@cluster0.n8siqt9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    // await mongoose.connect(url1,{dbName : "project_teacher_db"});

    console.log("connected to DB");
  } catch (error) {
    console.log("database",error);
  }
};

export default connectDB;
