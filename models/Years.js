import mongoose from "mongoose";
 
import Months from "./Months.js";
const { Schema } = mongoose;
const YearsSchema = new Schema(
    {
        yearNumber: {
            type: String,
            trim: true,
            required: true,

        },
        
        months: [Months.schema],

      
       
     
       
    },
    { timestamps: true }
);


export default mongoose.model("Years", YearsSchema);