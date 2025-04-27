export const AppReducer = (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        loading: false,
        transactions: action.payload,
        error: null,
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
      };
    case "ADD_TRANSACTION":
      if (
        !action.payload._id ||
        !action.payload.text ||
        action.payload.amount === undefined
      ) {
        return {
          ...state,
          error: "Invalid transaction data",
        };
      }
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      console.warn(`Unhandled action type: ${action.type}`);
      return state;
  }
};
