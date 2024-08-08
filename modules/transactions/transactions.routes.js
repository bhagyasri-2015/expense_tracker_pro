const express = require("express");

const auth = require("../../middleware/auth");
const addincome = require("./controllers/addincome");
const addexpense = require("./controllers/addexpense");
const gettransactions = require("./controllers/gettransaction");
const deletetransaction = require("./controllers/deletetransaction");
const edittransaction = require("./controllers/edittransaction");

const transactionroutes = express.Router();

transactionroutes.use(auth);

transactionroutes.post("/addincome", addincome);
transactionroutes.post("/addexpense", addexpense);
transactionroutes.get("/", gettransactions);

transactionroutes.delete("/:transaction_id", deletetransaction);
transactionroutes.patch("/", edittransaction);

module.exports = transactionroutes;
