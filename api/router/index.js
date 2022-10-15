const rootRouter = require("express").Router();

const authRouter = require("../router/auth.router");
const productRouter = require("../router/product.router");
const userRouter = require("../router/user.router");


rootRouter.use("/auth", authRouter);
rootRouter.use("/prod", productRouter);
rootRouter.use("/user", userRouter);

module.exports = rootRouter;
