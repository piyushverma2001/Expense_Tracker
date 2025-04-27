import React, { useContext, useEffect, useState } from "react";
import { Transaction } from "./Transaction.jsx";
import { GlobalContext } from "../context/GlobalState.jsx";

export const TransactionList = () => {
  const [loading, setLoading] = useState(true);
  const { transactions, getTransactions } = useContext(GlobalContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getTransactions();
      } catch (err) {
        console.error("Error fetching transactions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h3>History</h3>
      {transactions.length === 0 ? (
        <p>No transactions available!</p>
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
