import React, { useContext, useMemo } from "react";
import { GlobalContext } from "../context/GlobalState.jsx";

export const Balance = () => {
  const { transactions = [] } = useContext(GlobalContext);

  const total = useMemo(() => {
    return transactions.length
      ? transactions
          .map((t) => Number(t.amount))
          .reduce((acc, curr) => acc + curr, 0)
          .toFixed(2)
      : "0.00";
  }, [transactions]);

  const formattedTotal = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(total);

  return (
    <>
      <h4>Your Balance</h4>
      <h1 className={total >= 0 ? "positive" : "negative"}>{formattedTotal}</h1>
    </>
  );
};
