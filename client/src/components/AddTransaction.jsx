import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState.jsx";

export const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text || !amount) {
      alert("Please fill in both fields");
      return;
    }

    const newTransaction = {
      text,
      amount: parseFloat(amount) || 0,
    };

    addTransaction(newTransaction);

    setText("");
    setAmount("");
  };

  return (
    <>
      <h3>Add a new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (Negative - Expense, Positive - Income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn" type="submit" disabled={!text || !amount}>
          Add transaction
        </button>
      </form>
    </>
  );
};
