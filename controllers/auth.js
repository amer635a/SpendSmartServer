import User from "../models/users.js";
import Expenses from "../models/Expenses.js";
import Incomes from "../models/Incomes.js";
import Goals from "../models/Goals.js";
import Years from "../models/Years.js";
import Months from "../models/Months.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
 
dotenv.config();



export const updateInvestAmount = async (req, res) => {
    console.log("updateInvestAmount->")
    const { newInvestAmount } = req.body; // Assuming newInvestAmount is provided in the request body

    try {
        // Find the user by ID and update their investAmount
        const user = await User.findByIdAndUpdate('64d373c5bf764a582023e5f7', { investAmount: newInvestAmount }, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({
            message: "Investment amount updated successfully",
            user: {
                id: user._id,
                investAmount: user.investAmount
            }
        });
    } catch (error) {
        console.error("Error updating investment amount:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getSavings=async (req,res)=>{
    console.log("getSavings -> ")
    const user = await User.findById('64d373c5bf764a582023e5f7')
    const savings=user.savings
    return res.json({
        message: "Savings returned successfully",
        savings,
    });
}

export const getInvestAmount=async (req,res)=>{
    console.log("getInvestAmount -> ")
    const user = await User.findById('64d373c5bf764a582023e5f7')
    console.log("found user")
    const investAmount=user.investAmount
    console.log("investAmount "+{investAmount})
    return res.json({
        message: "investAmount returned successfully",
        investAmount,
    });
}


export const getAvailableDates = async (req, res) => {
    try {
        const userId = '64d373c5bf764a582023e5f7'; // Replace with your actual user ID

        // Find the user by ID
        const user = await User.findById(userId);

        // Check if the user was found
        if (!user) {
            return res.json({
                error: "User not found",
            });
        }

        // Collect unique month and year combinations from the user's data
        const availableDates = [];

        user.years.forEach((year) => {
            year.months.forEach((month) => {
                const date = `${year.yearNumber}-${month.MonthNumber}`;
                if (!availableDates.includes(date)) {
                    availableDates.push(date);
                }
            });
        });   
        console.log("Available Dates:", availableDates);

        return res.json({
            message: "Available dates retrieved successfully",
            availableDates,
        });
    } catch (error) {
        console.error("Error getting available dates:", error);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};




/* Goal */
export const deleteGoal = async (req, res) => {
    try {
        
        const userId = '64d373c5bf764a582023e5f7'; // Replace with your actual user ID
        const { goalId } = req.params;

        // Find the user by ID
        const user = await User.findById(userId);

        // Check if the user was found
        if (!user) {
            return res.json({
                error: "User not found",
            });
        }

        // Remove the goal from the user's goals array based on goalId
        user.goals = user.goals.filter((goal) => goal._id.toString() !== goalId);

        // Save the user document after removing the goal
        await user.save();

        return res.json({
            message: "Goal deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting goal:", error);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};
export const getGoals=async (req,res)=>{

    const user = await User.findById('64d373c5bf764a582023e5f7')
    const goals=user.goals
    return res.json({
        message: "Goals returned successfully",
        goals,
    });
}
export const insertGoals = async (req, res) => {

    console.log("insert Goals"); 
    const { user_id,name, amount,rate,description,collected,remaining,achieved,startDate,endDate } = req.body;
    
    console.log(user_id)
    if (!name || !amount || !rate ) {
        return res.json({
            error: "Name, Amount, and rate are required",
        });
    }
    try {
        const goal = await new Goals({
            name,
            amount,
            rate,
            description,
            collected,
            remaining,
            achieved,
            startDate,
            endDate,
           
        })
        const user = await User.findById('64d373c5bf764a582023e5f7');
        // Check if the user was found
        if (!user) {
            return res.json({
                error: "User not found",
            });
        }
        // Add the goal to the user's goals array
        user.goals.push(goal);

        // Save the user document with the new goal
        await user.save();

        // Send a response or do other actions as needed
        return res.json({
            message: "goal added successfully",
            goal,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    } 
};
///////////////

export const getYear=async (req,res)=>{
    const user = await User.findById('64d373c5bf764a582023e5f7')
    const years=user.years
    return res.json({
        message: "Incomes returned successfully",
        years,
    });
}

/* Incomes  */
export const getIncomes = async (req, res) => {
 
    try {
        const { user_id, yearNumber, monthNumber } = req.body;
        console.log("getIncomes --> user_id "+user_id +" yearNumber "+yearNumber +" monthNumber "+monthNumber)
        const user = await User.findById(user_id);
        if (!user) {
            return res.json({
                error: "User not found",
            });
        }
        console.log("user id exist")

        const year = user.years.find((y) => y.yearNumber == yearNumber);
        if (!year) {
            return res.json({
                error: "Year not found",
            });
        }
        console.log("year is exist")
        console.log(year.months)
        const month = year.months.find((m) => m.MonthNumber === monthNumber);
        if (!month) {
            console.error("month not exist")
            return res.json({
                error: "Month not found",
            });
        }
        console.log("month is exist")
        console.log(month)
        const incomes = month.incomes;
        console.log("return incomes"+incomes)
        console.log(incomes)
        return res.json({
            message: "Incomes returned successfully",
            incomes,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};
export const insertIncomes = async (req, res) => {
    console.log("insertIncomes- >")
    try {
        const { user_id, yearNumber, monthNumber, name, amount,tracked, percentage } = req.body;

        if (!name || !amount || !percentage || !tracked || !yearNumber || !monthNumber) {
            return res.json({
                error: "Name, Amount, Percentage, Tracked, YearNumber, and MonthNumber are required",
            });
        }

        const user = await User.findById(user_id);
        if (!user) {
            return res.json({
                error: "User not found",
            });
        }
   

        const income = new Incomes({
            name,
            amount,
            tracked,
            percentage,
        });

        let year = user.years.find((y) => y.yearNumber == yearNumber);
        // If the year is not found, create a new one
        if (!year) {
            console.log("create new year")
            year = { yearNumber, months: [] };
            const month = { MonthNumber: monthNumber, incomes: [income] };
            year.months.push(month);
            user.years.push(year);
            await user.save();
            return
        }
        
        let month = year.months.find((m) => m.MonthNumber == monthNumber);

        // If the month is not found, create a new one
        if (!month) {
            month = { MonthNumber: monthNumber, incomes: [income] };
            year.months.push(month);
            await user.save();
            return
        }
       
        month.incomes.push(income);
        await user.save();  
        return res.json({
            message: "income added successfully",
            income,
        });  
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};
export const updateAmount = async (req, res) => {
    console.log("updateAmount -->")
    try {
        const { incomeId } = req.params;
        const { newAmount, yearNumber, monthNumber } = req.body;
        console.log("incomeId ",incomeId," newAmount",newAmount)

        if (!newAmount || !yearNumber || !monthNumber) {
            return res.json({
                error: "New Amount value, yearNumber, and monthNumber are required",
            });
        }

        const userId = '64d373c5bf764a582023e5f7'; // Replace with your actual user ID
        const user = await User.findById(userId);

        if (!user) {
            return res.json({
                error: "User not found",
            });
        }
        console.log("user exist ")
        // Find the income in the user's data
        const income = user.years.reduce((foundIncome, year) => {
            const month = year.months.find((m) =>
                m.incomes.some((e) => e._id.toString() === incomeId)
            );
            if (month) {
                foundIncome = month.incomes.find(
                    (e) => e._id.toString() === incomeId
                );
            }
            return foundIncome;
        }, null);

        if (!income) {
            return res.json({
                error: "income not found",
            });
        }

        // Update the Amount value
        income.amount = newAmount;

        // Save the user document with the updated Amount
        await user.save();

        return res.json({
            success: true,
            message: "Amount updated successfully",
            income,
        });
    } catch (error) {
        console.error("Error updating Amount:", error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};
export const deleteIncome = async (req, res) => {
    try {
        const { incomeId } = req.params;
        const userId = '64d373c5bf764a582023e5f7'; // Replace with your actual user ID
        console.log("deleteIncome --> incomeId ",incomeId)

        // Find the user by ID
        const user = await User.findById(userId);

        // Check if the user was found
        if (!user) {
            return res.json({
                error: "User not found",
            });
        }
        console.log("user exist ")

        // Iterate through years and months to find and remove the Income
        user.years.forEach((year) => {
            year.months.forEach((month) => {
                month.incomes = month.incomes.filter((income) => income._id.toString() !== incomeId);
            });
        });

        // Save the user document after removing the Income
        await user.save();

        return res.json({
            message: "Income deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting Income:", error);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};
///////////////

/*  Expenses  */
export const getExpenses = async (req, res) => {
    
    try {
        const { user_id, yearNumber, monthNumber } = req.body;
        console.log("user_id "+user_id +" yearNumber "+yearNumber +" monthNumber "+monthNumber)
        const user = await User.findById(user_id);
        if (!user) {
            return res.json({
                error: "User not found",
            });
        }
        console.log("user id exist")

        const year = user.years.find((y) => y.yearNumber == yearNumber);
        if (!year) {
            return res.json({
                error: "Year not found",
            });
        }
        console.log("year is exist")
        console.log(year.months)
        const month = year.months.find((m) => m.MonthNumber === monthNumber);
        if (!month) {
            console.error("month not exist")
            return res.json({
                error: "Month not found",
            });
        }
        console.log("month is exist")
        const expenses = month.expenses;
        console.log("return expenses"+expenses)
        return res.json({
            message: "Expenses returned successfully",
            expenses,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};
export const insertExpenses = async (req, res) => {
    try {
        const { user_id, name, tracked, budget, yearNumber, monthNumber } = req.body;

        if (!name || !tracked || !budget || !yearNumber || !monthNumber) {
            return res.json({
                error: "Name, Tracked, Budget, YearNumber, and MonthNumber are required",
            });
        }

        const user = await User.findById(user_id);
        if (!user) {
            return res.json({
                error: "User not found",
            });
        }

        const expense = new Expenses({
            name,
            tracked,
            budget,
        });

        let year = user.years.find((y) => y.yearNumber == yearNumber);
        // If the year is not found, create a new one
        if (!year) {
            console.log("create new year")
            year = { yearNumber, months: [] };
            const month = { MonthNumber: monthNumber, expenses: [expense] };
            year.months.push(month);
            user.years.push(year);
            await user.save();
            return res.json({
                message: "Expense added successfully",
                expense,
            });
        }
        
        let month = year.months.find((m) => m.MonthNumber == monthNumber);

        // If the month is not found, create a new one
        if (!month) {
            month = { MonthNumber: monthNumber, expenses: [expense] };
            year.months.push(month);
            await user.save();
            return res.json({
                message: "Expense added successfully",
                expense,
            });
        }

        month.expenses.push(expense);

        await user.save();

        return res.json({
            message: "Expense added successfully",
            expense,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};
export const deleteExpense = async (req, res) => {
    try {
        const { expenseId } = req.params;
        const userId = '64d373c5bf764a582023e5f7'; // Replace with your actual user ID

        // Find the user by ID
        const user = await User.findById(userId);

        // Check if the user was found
        if (!user) {
            return res.json({
                error: "User not found",
            });
        }

        // Iterate through years and months to find and remove the expense
        user.years.forEach((year) => {
            year.months.forEach((month) => {
                month.expenses = month.expenses.filter((expense) => expense._id.toString() !== expenseId);
            });
        });

        // Save the user document after removing the expense
        await user.save();

        return res.json({
            message: "Expense deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting expense:", error);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};
export const updateBudget = async (req, res) => {
    
    try {
        const { expenseId } = req.params;
        const { newBudget, yearNumber, monthNumber } = req.body;
        console.log("expenseId ",expenseId," newBudget",newBudget)

        if (!newBudget || !yearNumber || !monthNumber) {
            return res.json({
                error: "New budget value, yearNumber, and monthNumber are required",
            });
        }

        const userId = '64d373c5bf764a582023e5f7'; // Replace with your actual user ID
        const user = await User.findById(userId);

        if (!user) {
            return res.json({
                error: "User not found",
            });
        }

        // Find the expense in the user's data
        const expense = user.years.reduce((foundExpense, year) => {
            const month = year.months.find((m) =>
                m.expenses.some((e) => e._id.toString() === expenseId)
            );
            if (month) {
                foundExpense = month.expenses.find(
                    (e) => e._id.toString() === expenseId
                );
            }
            return foundExpense;
        }, null);

        if (!expense) {
            return res.json({
                error: "Expense not found",
            });
        }

        // Update the budget value
        expense.budget = newBudget;

        // Save the user document with the updated budget
        await user.save();

        return res.json({
            success: true,
            message: "Budget updated successfully",
            expense,
        });
    } catch (error) {
        console.error("Error updating budget:", error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};
///////////////


/*   signup / signin  */
export const signup = async (req, res) => {
    console.log("Signup Hit");
    try {
        // validation
        const { name, email, password } = req.body;
        if (!name) {
            return res.json({
                error: "Name is required",
            });
        }
        if (!email) {
            return res.json({
                error: "Email is required",
            });
        }
        if (!password || password.length < 6) {
            return res.json({
                error: "Password is required and should be 6 characters long",
            });
        }
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({
                error: "Email is taken",
            });
        }
        // hash password
        const hashedPassword = await hashPassword(password);
        try {
            const user = await new User({
                name,
                email,
                password: hashedPassword,
            }).save();
            // create signed token
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });
            //   console.log(user);
            const { password, ...rest } = user._doc;
            return res.json({
                token,
                user: rest,
            });
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
};
export const signin = async (req, res) => {
    // console.log(req.body);
    try {
        const { email, password } = req.body;
        // check if our db has user with that email
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: "No user found",
            });
        }
        // check password
        const match = await comparePassword(password, user.password);
        if (!match) {   
            return res.json({
                error: "Wrong password",
            });
        }
        // create signed token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        user.password = undefined;
        user.secret = undefined;
        res.json({
            token,
            user,
        });
        return user
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try again.");
    }
};
///////////////