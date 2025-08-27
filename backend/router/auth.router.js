import express from "express";
import {
  AllUser,
  currentUser,
  login,
  logout,
  profilePage,
  signup,
} from "../controllers/auth.controllers.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.put("/profile",isAuth, upload.single("image"), profilePage);
authRouter.get("/current", isAuth, currentUser);
authRouter.get("/allUser", isAuth, AllUser);

export default authRouter;
