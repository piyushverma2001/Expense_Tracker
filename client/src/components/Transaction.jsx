import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState.jsx";
import { numberWithCommas } from "../utils/format.js";
import PropTypes from "prop-types";

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  return (
    <li className={transaction.amount < 0 ? "minus" : "plus"}>
      {transaction.text}
      <span>₹{numberWithCommas(Math.abs(transaction.amount))}</span>
      <button
        onClick={() => deleteTransaction(transaction._id)}
        className="delete-btn"
        aria-label={`Delete ${transaction.text} transaction`}
      >
        X
      </button>
    </li>
  );
};

Transaction.propTypes = {
  transaction: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
};
