const express = require("express");
const app = express();
const cors = require("cors");
const transactionRouter = require("./controllers/transactionController");

app.use(cors());
app.use(express.json());
app.use("/transactions", transactionRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the transaction API!");
});

module.exports = app;
