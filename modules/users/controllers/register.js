const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const jwtmanager = require("../../../managers/jwtmanager");

const register = async (req, res) => {
  const usermodel = mongoose.model("users");

  const { email, password, confirm_password, name, balance } = req.body;

  if (!email) throw "email must be provided";
  if (!password) throw "password must be provided";
  if (password.length < 5) throw "password must be at least 5 char";

  if (!name) throw "name is required";
  if (password !== confirm_password)
    throw "password and confirmed password doesnot match";

  const getduplicateemail = await usermodel.findOne({
    email: email,
  });

  if (getduplicateemail) throw "this email already exists";

  const hashedpassword = await bcrypt.hash(password, 12);

  const createduser = await usermodel.create({
    name: name,
    email: email,
    password: hashedpassword,
    balance: balance,
  });

  const accesstoken = jwtmanager(createduser);

  res.status(200).json({
    status: "user registeration successful",
    accesstoken: accesstoken,
  });

  await emailmanager(
    createduser.email,
    "welcome to expense tracker pro",
    "<h1>welcome</h1><br/><br/>we can manage",
    "welcome to expense tracker pro"
  );
};
module.exports = register;
