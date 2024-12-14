import React, { useContext, useEffect, useState } from "react";
import { Transaction } from "./Transaction.jsx";
import { GlobalContext } from "../context/GlobalState.jsx";

export const TransactionList = () => {
  const { transactions, getTransactions } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getTransactions();
      setLoading(false);
    };
    fetchData();
  }, [getTransactions]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h3>History</h3>
      {transactions.length === 0 ? (
        <p>No transactions available</p>
      ) : (
        <ul className="list">
          {transactions.map((transaction) => (
            <Transaction key={transaction._id} transaction={transaction} />
          ))}
        </ul>
      )}
    </>
  );
};
