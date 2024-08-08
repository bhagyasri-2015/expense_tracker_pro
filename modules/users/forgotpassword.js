const mongoose = require("mongoose");
const emailmanager = require("../../managers/emailmanager");

const forgotpassword = async (req, res) => {
  const usermodel = mongoose.model("users");

  const { email } = req.body;

  if (!email) throw "email is required";

  const getuser = await usermodel.findOne({
    email: email,
  });

  if (!getuser) throw "this email doesnot exist in system";

  const resetcode = Math.floor(1000 + Math.random() * 90000);

  await usermodel.updateOne(
    {
      email: email,
    },
    {
      reset_code: resetcode,
    },
    {
      runvalidators: true,
    }
  );

  await emailmanager(
    email,
    "your password reset code  is" + resetcode,
    "your password reset code  is" + resetcode,
    "reset your password"
  );
  res.status(200).json({
    status: "reset code senf to email successfully",
  });
};
module.exports = forgotpassword;
