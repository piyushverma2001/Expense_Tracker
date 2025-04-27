import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState.jsx";

export const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      alert("Description is required.");
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue === 0) {
      alert("Amount must be a non-zero number.");
      return;
    }

    addTransaction({ text, amount: amountValue });

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
            id="text"
            type="text"
            maxLength="50"
            value={text}
            required
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
            id="amount"
            type="number"
            step="0.01"
            required
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
