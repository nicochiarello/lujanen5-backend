import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb://localhost:27017/lujanen5"
  )
  .then(() => console.log("Connected to DB"));

export default mongoose;
