import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import connectDB from "./lib/db.js";
import { app, server } from "./lib/socket.js";
dotenv.config();

const PORT = process.env.PORT || 50001;
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
