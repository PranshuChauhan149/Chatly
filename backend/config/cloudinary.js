import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv"

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (filepath) => {
  if (!filepath) return null;  // ✅ अगर path ही नहीं है तो avoid error

  try {
    const uploadResult = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto", // ✅ image/video दोनों handle करेगा
    });

    // ✅ file को local से remove करना
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    return uploadResult?.secure_url;
  } catch (error) {
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

export default uploadOnCloudinary;
