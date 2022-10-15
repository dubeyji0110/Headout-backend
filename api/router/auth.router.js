const authRouter = require("express").Router();

const authController = require("../controllers/auth.controller");

authRouter.get("/", authController.login);

module.exports = authRouter;
