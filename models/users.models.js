const mongoose = require("mongoose");

const usersschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide full name"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "password is required"],
    },

    balance: {
      type: Number,
      required: [true, "balance is required"],

      default: 0,
    },

    reset_code: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const usermodel = mongoose.model("users", usersschema);

module.exports = usermodel;
