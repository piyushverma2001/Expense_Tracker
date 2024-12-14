import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState.jsx";
import { numberWithCommas } from "../utils/format.js";

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);

  let income = 0;
  let expense = 0;

  amounts.forEach((item) => {
    if (item > 0) {
      income += item;
    } else {
      expense += item;
    }
  });

  const formattedIncome = income > 0 ? income.toFixed(2) : "0.00";
  const formattedExpense = expense < 0 ? (-expense).toFixed(2) : "0.00";

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">₹{numberWithCommas(formattedIncome)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">₹{numberWithCommas(formattedExpense)}</p>
      </div>
    </div>
  );
};
