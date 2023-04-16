const express = require("express");
const transactionRouter = express.Router();
const transactionModel = require("../models/transactionModels");

transactionRouter
  .route("/")
  .get((req, res) => {
    res.send(transactionModel);
  })
  .post((req, res) => {
    transactionModel.push(req.body);
    res.status(201).json(transactionModel[transactionModel.length - 1]);
  });

module.exports = transactionRouter;
