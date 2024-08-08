const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const jwtmanager = require("../../../managers/jwtmanager");

const login = async (req, res) => {
  const usermodel = mongoose.model("users");

  const { email, password } = req.body;

  const getuser = await usermodel.findOne({
    email: email,
  });

  if (!getuser) throw "this email does not exist ";

  const comparepassword = await bcrypt.compare(password, getuser.password);

  if (!comparepassword) throw "email and password soes not match";

  const accesstoken = jwtmanager(getuser);

  res.status(200).json({
    status: "success",
    message: "user logged in successfully",
    accesstoken: accesstoken,
  });
};
module.exports = login;
