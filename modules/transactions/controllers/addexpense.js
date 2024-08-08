const transactionroutes = require("../transactions.routes");

const mongoose = require("mongoose");
const validator = require("validator");

const addexpense = async (req, res) => {
  const usermodel = mongoose.model("users");
  const transactionmodel = mongoose.model("transactions");
  const { amount, remarks } = req.body;
  if (!amount) throw "amount is requires";
  if (!remarks) throw "remarks is required";

  if (remarks.length < 5) throw "remarks must be at least 5";

  if (!validator.isNumeric(amount.toString())) throw "amount must be numbetr";

  if (amount < 0) throw " amount not be negative";

  await transactionmodel.create({
    user_id: req.user._id,
    amount: amount,
    remarks: remarks,
    transaction_type: "expense",
  });

  await usermodel.updateOne(
    {
      _id: req.user._id,
    },
    {
      $inc: {
        balance: amount * -1,
      },
    },
    {
      runvalidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "expense added successfully",
  });
};

module.exports = addexpense;
