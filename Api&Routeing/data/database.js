import mongoose from "mongoose";


//connect with mongo
export const connectDB =()=>{
 mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "backendAPI",
  })
  .then(() => console.log("DB connected"))
  .catch((e) => console.log(e));

}