const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const emailmanager = require("../../../managers/emailmanager");

const resetpassword = async (req, res) => {
  const usermodel = mongoose.model("users");

  const { email, new_password, reset_code } = req.body;

  if (!email) throw "email is required";
  if (!new_password) throw "please provide new password";
  if (!reset_code) throw "reset code is required";
  if (new_password.length < 5) throw "password must be at least 5";

  const getuserwithresetcode = await usermodel.findOne({
    email: email,
    reset_code: reset_code,
  });

  if (!getuserwithresetcode) throw "reset code does not match";

  const hashedpassword = await bcrypt.hash(new_password, 12);

  await usermodel.updateOne(
    {
      email: email,
    },
    {
      password: hashedpassword,
      reset_code: "",
    },
    {
      runvalidators: true,
    }
  );

  await emailmanager(
    email,
    "your password is rested successfully if u have not done pls contact us",
    "your password is rested successfully if u have not done pls contact us",
    "password reset successfully"
  );
  res.status(200).json({
    status: "success",
    message: "password is changed",
  });
};

module.exports = resetpassword;
