import express from "express";
import {
  getAllTransactions,
  getOneTransaction,
  createOneTransaction,
  deleteOneTransaction,
  updateOneTransaction,
} from "../queries/transactionQueries";
import transactionsValidator from "../../src/validators/transactionValidator";

const transactionRouter = express.Router();

transactionRouter
  .route("/")
  .get(async (req, res) => {
    const { error, result } = await getAllTransactions();
    if (error) {
      res.status(500).json({ error: "server error" });
    } else {
      res.status(200).json(result);
    }
  })
  .post(transactionsValidator, async (req, res) => {
    const { error, result } = await createOneTransaction(req.body);
    if (error) {
      res.status(500).json({ error: "server error" });
    } else {
      res.status(201).json(result);
    }
  });

transactionRouter
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const { error, result } = await getOneTransaction(id);
    if (error?.code === 0) {
      res.status(404).json({ error: "bookmark not found" });
    } else if (error) {
      res.status(500).json({ error: "server error" });
    } else {
      res.status(200).json(result);
    }
  })
  .put(transactionsValidator, async (req, res) => {
    const { id } = req.params;
    const { error, result } = await updateOneTransaction(id, req.body);
    if (error) {
      res.status(500).json({ error: "server error" });
    } else {
      res.status(200).json(result);
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const { error, result } = await deleteOneTransaction(id);
    if (error) {
      res.status(404).json("Bookmark not found");
    } else {
      res.status(201).json(result);
    }
  });

export default transactionRouter;
