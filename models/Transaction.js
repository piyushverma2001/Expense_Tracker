import { Schema, model } from "mongoose";

const TransactionSchema = new Schema(
  {
    description: {
      type: String,
      trim: true,
      required: [true, "Please add a description for the transaction"],
    },
    amount: {
      type: Number,
      required: [true, "Please add a positive or negative amount"],
      validate: {
        validator: function (value) {
          return value !== 0;
        },
        message: "Amount cannot be zero",
      },
    },
  },
  { timestamps: true }
);

export default model("Transaction", TransactionSchema);
