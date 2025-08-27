import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./router/auth.router.js";
import messageRouter from "./router/messageRoute.js";
import connectDb from "./config/db.js";
import { app, server } from "./socket.js"; // ✅ import app + server from socket.js
import express from "express"
import cors from "cors";

dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://chatly-self.vercel.app",
    credentials: true,
  })
);

// Routes
app.get("/", (req, res) => res.send("Server is working"));
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

// Start server using the HTTP server from socket.js
const PORT = process.env.PORT || 4000;
server.listen(PORT, async () => {
  await connectDb();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


