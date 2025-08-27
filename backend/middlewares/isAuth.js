import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "User not logged in" });
    }

    const decoded = jwt.verify(token, process.env.SCERET_KEY);

    req.userId = decoded.userId; // pehle set karo
    console.log("req.userId:", req.userId); // ab log karo ✅

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default isAuth;
