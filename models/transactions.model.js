const mongoose = require("mongoose");

const transactionsschema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
    transaction_type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
    },

    remarks: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const transactionsmodel = mongoose.model("transactions", transactionsschema);

module.exports = transactionsmodel;
