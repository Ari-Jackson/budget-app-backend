const app = require("./app");

// CONFIGURATION
require("dotenv").config();
const PORT = process.env.PORT;

app.listen(PORT || 3000, () => {
  console.log(`I'll be right by your side, on port ${PORT || 3000}`);
});
