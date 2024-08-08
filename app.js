const express = require("express");
const cors = require("cors");

require("express-async-errors");
const errorhandler = require("./handlers/errorhandler");
const mongoose = require("mongoose");
const userRoutes = require("./modules/users/users.routes");
const transactionroutes = require("./modules/transactions/transactions.routes");

require("dotenv").config();

const app = express();
app.use(cors());

mongoose
  .connect(process.env.mongo_connection, {})
  .then(() => {
    console.log("mongo connection successful");
  })
  .catch(() => {
    console.log("mongo connection failed");
  });

require("./models/users.models");
require("./models/transactions.model");

app.use(errorhandler);
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionroutes);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "not found",
  });
});

app.listen(443, () => {
  console.log("server started successfully");
});
