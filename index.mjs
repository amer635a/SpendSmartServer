import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import morgan from "morgan"
import dotenv from "dotenv"
const m = morgan
const app = express();
dotenv.config()
console.log("start")
const Url_DB="mongodb+srv://WaelProject:Wael123@cluster0.ekp8izv.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(Url_DB).then(() => console.log("DB connected")).catch((err) => console.log("DB CONNECTION ERROR:", err));
 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(m("dev"));

app.use("/api", authRoutes);

app.listen(8000, () => console.log("Server running on port 8000"));
