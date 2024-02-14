import mongoose from "mongoose";
import Years from "./Years.js";
import Goals from "./Goals.js";
const { Schema } = mongoose;
const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 64,
        },
       years: [Years.schema],
       goals: [Goals.schema],

      
        savings: {
            type: String,
            trim: true,
            required: true,
        },
        role: {
            type: String,
            default: "Subscriber",
        },
        image: {
            public_id: "",
            url: "",
        },
        resetCode: "",
    },
    { timestamps: true }
);


export default mongoose.model("User", userSchema);