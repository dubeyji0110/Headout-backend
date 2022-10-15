const rootRouter = require("express").Router();

const authRouter = require("../router/auth.router");
const userRouter = require("../router/user.router");

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);

module.exports = rootRouter;
