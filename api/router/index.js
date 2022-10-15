const rootRouter = require("express").Router();

const authRouter = require("../router/auth.router");

rootRouter.use("/auth", authRouter);

module.exports = rootRouter;
