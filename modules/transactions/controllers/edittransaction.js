const mongoose = require("mongoose");
const validator = require("validator");

const edittransaction = async (req, res) => {
  const transactionmodel = mongoose.model("transactions");

  const { transaction_id, remarks, amount, transaction_type } = req.body;

  if (!transaction_id) throw "transaction id is required";

  if (transaction_type !== "income" && transaction_type !== "expense")
    throw "transaction type must be income or expense";

  if (!validator.isMongoId(transaction_id.toString()))
    throw "please provide a valid id";

  const gettransaction = await transactionmodel.findOne({
    _id: transaction_id,
  });

  if (!gettransaction) throw "transaction not found";

  await transactionmodel.updateOne(
    {
      _id: transaction_id,
    },
    {
      remarks,
      transaction_type,
      amount,
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "edit transaction",
  });
};

module.exports = edittransaction;
