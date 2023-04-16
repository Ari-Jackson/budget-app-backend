const express = require("express");
const app = express();
const cors = require("cors");
const transactionRouter = require("./controllers/transactionController");

app.use(cors());
app.use(express.json());
app.use("/transaction", transactionRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

module.exports = app;
