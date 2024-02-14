import mongoose from "mongoose";
import Expenses from "./Expenses.js";
import Incomes from "./Incomes.js";
import Goals from "./Goals.js";

const { Schema } = mongoose;
const MonthsSchema = new Schema(
    {
        MonthNumber: {
            type: String,
            trim: true,
            required: true,

        },
 
        expenses: [Expenses.schema],
        incomes: [Incomes.schema],
   
      
     
       
    },
    { timestamps: true }
);


export default mongoose.model("Months", MonthsSchema);