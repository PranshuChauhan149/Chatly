import express from "express";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
import { sendMessage, showMessage } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.post(
  "/send/:receiverId",
  isAuth,
  upload.single("image"),
  sendMessage
);

messageRouter.get("/get-message/:receiverId",isAuth,showMessage)

export default messageRouter;
