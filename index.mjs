import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import morgan from "morgan"
import dotenv from "dotenv"
const m = morgan
const app = express();
dotenv.config()

mongoose.connect(process.env.DATABASE).then(() => console.log("DB connected")).catch((err) => console.log("DB CONNECTION ERROR:", err));
console.log("asdasd")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(m("dev"));

app.use("/api", authRoutes);

app.listen(8000, () => console.log("Server running on port 8000"));
