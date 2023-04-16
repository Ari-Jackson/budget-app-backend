const express = require("express");
const transactionRouter = express.Router();
const transactionTable = require("../controllers/transactionController");

transactionRouter.get("/", (req, res) => {
  res.send("Welcome to the transation lookup!");
});

module.exports = transactionRouter;
