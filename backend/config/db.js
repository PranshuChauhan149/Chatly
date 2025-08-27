import mongoose from "mongoose";

const connectDb = async ()=>{
  try {
    const res = mongoose.connect(process.env.MONGOOSE_URL);
    if(res) console.log("DB connected Successfully");
    
  } catch (error) {
    console.log(error);
    
  }
}

export default connectDb;