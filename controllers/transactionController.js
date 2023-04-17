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

const findsTransaction = (id) => (trans) => {
  return trans.id === Number(id);
};

transactionRouter
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    const matchingTransaction = transactionModel.find(findsTransaction(id));

    if (!matchingTransaction) {
      res.status(404).send("No transaction found");
    } else {
      res.status(200).json(matchingTransaction);
    }
  })
  .put((req, res) => {
    const { id } = req.params;
    const matchingTransaction = transactionModel.find(findsTransaction(id));
    const matchingIndex = transactionModel.findIndex(findsTransaction(id));

    if (!matchingTransaction) {
      res.status(404).send("No matching transaction found");
    } else {
      transactionModel[matchingIndex] = req.body;
      res.status(200).json(transactionModel[matchingIndex]);
    }
  })
  .delete((req, res) => {
    const { id } = req.params;
    const matchingTransaction = transactionModel.find(findsTransaction(id));
    const matchingIndex = transactionModel.findIndex(findsTransaction(id));

    if (!matchingTransaction) {
      res.status(404).send("No matching transaction found");
    } else {
      transactionModel.splice(matchingIndex, 1);
      res.status(200).json(transactionModel);
    }
  });

module.exports = transactionRouter;
