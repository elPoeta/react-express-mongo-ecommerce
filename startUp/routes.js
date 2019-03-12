const errorMiddleware = require("../middlewares/error");
const auth = require("../routes/api/auth");
const category = require("../routes/api/category");
const customer = require("../routes/api/customer");
const privateCategory = require("../routes/private/category");

module.exports = app => {
  app.use("/api/auth", auth);
  app.use("/api/category", category);
  app.use("/admin/category", privateCategory);
  app.use("/api/customer", customer);
  app.use(errorMiddleware);
};
