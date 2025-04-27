import React, { createContext, useReducer, useCallback } from "react";
import { AppReducer } from "./AppReducer.jsx";
import axios from "axios";

const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getTransactions = useCallback(async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get("/api/v1/transactions");
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.error
        : "Network Error";
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: errorMessage,
      });
    }
  }, []);

  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.error
        : "Network Error";
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: errorMessage,
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/v1/transactions", transaction, config);
      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.error
        : "Network Error";
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: errorMessage,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        getTransactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
