import mongoose from "mongoose";
const { Schema } = mongoose;
const incomesSchema = new Schema(
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
        tracked: {
            type: String,
            trim: true,
            required: true,
             
        },
        percentage: {
            type: String,
            required: true,
            min: 6,
            max: 64,
        },
      
    },
    { timestamps: true }
);
export default mongoose.model("Incomes", incomesSchema);