import express, { type Express } from "express";
import cors from "cors";
import transactionRouter from "./controllers/transactionController";

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use("/transactions", transactionRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the transaction API!");
});

app.get("*", (req, res) => {
  res.status(404).json("Could not find resource, please try again");
});

export default app;
