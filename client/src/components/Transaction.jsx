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
      >
        <img
          src="/delete.png"
          alt="Delete"
          width="18"
          height="18"
        />
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
