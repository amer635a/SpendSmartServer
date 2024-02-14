import mongoose from "mongoose";
const { Schema } = mongoose;
const goalsSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        amount: {
            type: String,
            trim: true,
            required: true,
             
        },
        rate: {
            type: String,
            required: true,
            min: 6,
            max: 64,
        },
        description: {
            type: String,
            trim: true,
             
            
        },
        collected: {
            type: String,
            trim: true,
            required: true,
             
        },
        remaining: {
            type: String,
            trim: true,
            required: true,
            
        },
        achieved: {
            type: Boolean,
            trim: true,
            required: true,
        },
        startDate: {
            type: Date,
            trim: true,
            required: true,
        },
        endDate: {
            type: Date,
            trim: true,
            required: true,
        },
       
    },
    { timestamps: true }
);
export default mongoose.model("Goals", goalsSchema);