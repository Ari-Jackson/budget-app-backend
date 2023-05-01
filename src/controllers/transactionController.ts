import express, { Router } from "express";
import transactionModel from "../models/transactionModels";
import type { transactionModelType } from "../models/transactionModels";

const transactionRouter: Router = express.Router();

transactionRouter
  .route("/")
  .get((req, res) => {
    res.status(200).json(transactionModel);
  })
  .post((req, res) => {
    const nextId = transactionModel[transactionModel.length - 1].id + 1;
    console.log({ id: nextId, ...req.body });
    transactionModel.push({ id: nextId, ...req.body });
    res.status(201).json(transactionModel[transactionModel.length - 1]);
  });

const findsTransaction = (id: string) => (trans: transactionModelType) => {
  return trans.id === Number(id);
};

transactionRouter
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    const matchingTransaction = transactionModel.find(findsTransaction(id));

    if (!matchingTransaction) {
      res.status(404).send("No matching transaction found");
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

export default transactionRouter;
