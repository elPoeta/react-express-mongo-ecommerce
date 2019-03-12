const express = require("express");
const { PORT } = require("./config/keys");
const app = express();

require("./startUp/db")();
require("./startUp/parser")(app);
require("./startUp/routes")(app);

app.listen(PORT, err => {
  if (err) {
    console.error("Error to connect server ", err);
    process.exit(1);
  }
  console.log(`Server connected on port ${PORT}`);
});
