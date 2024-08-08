const mongoose = require("mongoose");

const userdashboard = async (req, res) => {
  const usermodel = mongoose.model("users");

  const transactionmodel = mongoose.model("transactions");
  console.log(req.user);

  const getuser = await usermodel
    .findOne({
      _id: req.user._id,
    })
    .select("name balance email");

  const transactions = await transactionmodel
    .find({
      user_id: req.user._id,
    })
    .sort("-createdAt")
    .limit(5);
  res.status(200).json({
    status: "success",
    data: getuser,
    transactions,
  });
};
module.exports = userdashboard;
