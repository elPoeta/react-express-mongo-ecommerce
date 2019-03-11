const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const auth = require("./routes/api/auth");

const privateCategory = require('./routes/private/category');

const { PORT, MONGO_URI } = require("./config/keys");

mongoose.Promise = global.Promise;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log("Error to connect database :: ", err));

const app = express();

app.use(cors());

app.use(bodyParser.json({ type: "*/*" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/auth", auth);

app.use('/admin/category', privateCategory);

app.use(function (err, req, res, next) {
  res.status(500).send("Internal server error");
});

app.listen(PORT, err => {
  if (err) console.error("Error to connect server ", err);
  console.log(`Server connected on port ${PORT}`);
});
