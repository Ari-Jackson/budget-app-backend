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

transactionRouter.route("/:id").get((req, res) => {
  const { id } = req.params;
  const matchingTransaction = transactionModel.find((trans) => {
    return trans.id === Number(id);
  });

  if (!matchingTransaction) {
    res.status(404).send("No transaction found");
  } else {
    res.status(200).json(matchingTransaction);
  }
});

module.exports = transactionRouter;
