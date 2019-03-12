const errorMiddleware = require("../middlewares/error");
const auth = require("../routes/api/auth");
const category = require("../routes/api/category");
const privateCategory = require("../routes/private/category");

module.exports = app => {
  app.use("/api/auth", auth);
  app.use("/api/category", category);
  app.use("/admin/category", privateCategory);
  app.use(errorMiddleware);
};
