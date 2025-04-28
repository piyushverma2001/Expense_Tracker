import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState.jsx";
import { numberWithCommas } from "../utils/format.js";

export const IncomeExpenses = () => {
  const { transactions = [] } = useContext(GlobalContext);

  const amounts = transactions.map((t) => Number(t.amount));

  const { income, expense } = amounts.reduce(
    (acc, val) => {
      if (val > 0) {
        acc.income += val;
      } else {
        acc.expense += val;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const formattedIncome = income > 0 ? income.toFixed(2) : "0.00";
  const formattedExpense = expense < 0 ? (-expense).toFixed(2) : "0.00";

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Total Income</h4>
        <p className="money plus">₹{numberWithCommas(formattedIncome)}</p>
      </div>
      <div>
        <h4>Total Expense</h4>
        <p className="money minus">₹{numberWithCommas(formattedExpense)}</p>
      </div>
    </div>
  );
};
