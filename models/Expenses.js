import mongoose from "mongoose";
const { Schema } = mongoose;
const expensesSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        tracked: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        budget: {
            type: String,
            required: true,
            min: 6,
            max: 64,
        },
      
    },
    { timestamps: true }
);
export default mongoose.model("Expenses", expensesSchema);