// controllers/auth.controller.js

import uploadOnCloudinary from "../config/cloudinary.js";
import { genToken } from "../config/token.js";
import User from "../models/User.models.js";
import bcrypt from "bcrypt";
// controllers/auth.controller.js

import uploadOnCloudinary from "../config/cloudinary.js";
import { genToken } from "../config/token.js";
import User from "../models/User.models.js";
import bcrypt from "bcrypt";

// ================= SIGNUP =================
export const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email,
      password: hashPassword,
    });

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",  // ✅ cross-site allowed
      secure: true,      // ✅ only on HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error, please try again" });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",  // ✅
      secure: true,      // ✅
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error, please try again" });
  }
};

// ================= LOGOUT =================
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "none",  // ✅
      secure: true,      // ✅
    });

    return res.json({ success: true, message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
};


// ================= PROFILE UPDATE =================
export const profilePage = async (req, res) => {
  try {
    console.log(req.userId);

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const resUrl = await uploadOnCloudinary(req.file.path);

    const user = await User.findByIdAndUpdate(
      req.userId, // ✅ use JWT userId, not from body
      { image: resUrl },
      { new: true }
    ).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error, please try again" });
  }
};

// ================= CURRENT USER =================
export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Current user error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error, please try again" });
  }
};

export const AllUser = async (req,res) => {
  try {
    const userId = req.userId
    const allUser = await User.find({_id : {$ne : userId} }).select("-password");
    if (allUser) {
      res.json({ success: true, allUser });
    }
  } catch (error) {
    console.error("allUser user error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error, please try again" });
  }
};

