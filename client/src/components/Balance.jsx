import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState.jsx";

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.length
    ? amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)
    : "0.00";

  const formattedTotal = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(total);

  return (
    <>
      <h4>Your Balance</h4>
      <h1>{formattedTotal}</h1>
    </>
  );
};
