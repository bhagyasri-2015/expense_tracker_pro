const mongoose = require("mongoose");
const validator = require("validator");

const deletetransaction = async (req, res) => {
  const transactionmodel = mongoose.model("transactions");
  const usermodel = mongoose.model("users");

  const { transaction_id } = req.params;

  if (!validator.isMongoId(transaction_id.toString()))
    throw "please provide a valid id";

  const gettransaction = await transactionmodel.findOne({
    _id: transaction_id,
  });

  if (!gettransaction) throw "transaction not found";

  console.log(gettransaction);

  if (gettransaction.transaction_type === "income") {
    await usermodel.updateOne(
      {
        _id: gettransaction.user_id,
      },
      {
        $inc: {
          balance: gettransaction.amount * -1,
        },
      },
      {
        runvalidators: true,
      }
    );
  } else {
    await usermodel.updateOne(
      {
        _id: gettransaction.user_id,
      },
      {
        $inc: {
          balance: gettransaction.amount,
        },
      },
      {
        runvalidators: true,
      }
    );
  }

  await transactionmodel.deleteOne({
    _id: transaction_id,
  });

  res.status(200).json({
    status: "Transaction Deleted.",
  });
};

module.exports = deletetransaction;
