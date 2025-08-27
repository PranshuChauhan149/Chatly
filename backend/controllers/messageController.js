import uploadOnCloudinary from "../config/cloudinary.js";
import Conversation from "../models/Conversation.models.js";
import Message from "../models/Message.models.js";
import { getSocketId, io } from "../socket.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.userId;
    const { receiverId } = req.params;
    const { message } = req.body;

    let image = ""; // ✅ use let

    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      message,
      image,
    });

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    const sokId = getSocketId(receiverId);
    if(sokId){
      io.to(sokId).emit("getMessage",newMessage)
    }

    res.json({ success: true, newMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const showMessage = async (req,res) => {
  try {
    const senderId = req.userId;
    const { receiverId } = req.params;

    const findMessage = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
    if (!findMessage) {
      return res.status(200).json({ success: true, messages: [] });
    }
    res.json({ success: true, findMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
