const errorMiddleware = require("../middlewares/error");
const auth = require("../routes/api/auth");
const category = require("../routes/api/category");
const customer = require("../routes/api/customer");
const privateCategory = require("../routes/private/category");
const privateProduct = require("../routes/private/product");
const product = require("../routes/api/product");
const shoppingCart = require("../routes/api/shoppingCart");

module.exports = app => {
  app.use("/api/auth", auth);
  app.use("/api/category", category);
  app.use("/admin/category", privateCategory);
  app.use("/api/customer", customer);
  app.use("/admin/product", privateProduct);
  app.use("/api/product", product);
  app.use("/api/shopping-cart", shoppingCart);
  app.use(errorMiddleware);
};
