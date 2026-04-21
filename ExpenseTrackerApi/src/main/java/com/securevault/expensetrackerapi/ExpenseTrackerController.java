package com.securevault.expensetrackerapi;

import Models.Expense;
import Service.ExpenseTrackerBal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ExpenseTrackerController {

    @PostMapping("/addExpense")
    public String addExpense(@RequestBody Expense expense) {
        ExpenseTrackerBal bal = new ExpenseTrackerBal();
        try{
            bal.saveExpenses(expense);
            return "Expense Added Successfully";
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    @GetMapping("/getExpenses")
    public List<Expense> getExpenses() {
        ExpenseTrackerBal bal = new ExpenseTrackerBal();
        try {
            return bal.getAllExpenses();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
