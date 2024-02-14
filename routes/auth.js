import express from "express";

import {getExpenses, signin,signup, insertExpenses,getIncomes,insertIncomes,getGoals,insertGoals,
   getSavings,deleteGoal,updateBudget,deleteExpense,getAvailableDates} from "../controllers/auth.js";
const router = express.Router();


router.get("/", (req, res) => {
   res.send("hello from server")
 
});
 
router.get("/getAvailableDates", getAvailableDates);
router.delete("/deleteExpense/:expenseId", deleteExpense);
router.put("/updateBudget/:expenseId", updateBudget);
router.delete("/deleteGoal/:goalId", deleteGoal); 
router.get("/getSavings",getSavings);
router.get("/getGoals",getGoals);
router.post("/insertGoals", insertGoals);
router.post("/getIncomes",getIncomes);
router.post("/insertIncomes", insertIncomes);
router.post("/getExpenses",getExpenses);
router.post("/insertExpenses", insertExpenses);
router.post("/signup", signup);
router.post("/signin", signin);

export default router;