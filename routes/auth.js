import express from "express";

import {getExpenses, signin,signup, insertExpenses,getIncomes,insertIncomes,getGoals,insertGoals,
   getSavings,deleteGoal,updateBudget,deleteExpense,getAvailableDates,updateAmount} from "../controllers/auth.js";
const router = express.Router();


router.get("/", (req, res) => {
   res.send("hello from server")
 
});
 
router.get("/getAvailableDates", getAvailableDates);



router.get("/getSavings",getSavings);

router.get("/getGoals",getGoals);
router.post("/insertGoals", insertGoals);
router.delete("/deleteGoal/:goalId", deleteGoal); 

router.post("/getIncomes",getIncomes);
router.post("/insertIncomes", insertIncomes);
router.put("/updateAmount/:incomeId", updateAmount);


router.post("/getExpenses",getExpenses);
router.post("/insertExpenses", insertExpenses);
router.delete("/deleteExpense/:expenseId", deleteExpense);
router.put("/updateBudget/:expenseId", updateBudget);

router.post("/signup", signup);
router.post("/signin", signin);

export default router;