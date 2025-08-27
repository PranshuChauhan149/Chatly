import jwt from "jsonwebtoken";

export const genToken = async (userId) => {
  console.log(userId);
  
  try {
    const token = jwt.sign(
      { userId },  // correct variable
      process.env.SCERET_KEY, // fix spelling
      { expiresIn: "7d" }
    );
    return token;
  } catch (error) {
    console.error("Error in token generation:", error);
    return null;
  }
};
