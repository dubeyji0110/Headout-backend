const rootRouter = require("express").Router();

const authRouter = require("../router/auth.router");
const productRouter = require("../router/product.router");

rootRouter.use("/auth", authRouter);
rootRouter.use("/prod", productRouter);


module.exports = rootRouter;
