const express = require("express");
const app = express();

app.use(express.json());
app.use(require("cors"));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `I'll be right by your side, on port ${process.env.PORT || 3000}`
  );
});
