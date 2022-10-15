const authRouter = require("express").Router();

const jwt = require("../../utils/jwt");
const { schemas, validateBody } = require("../../utils/SchemaValidator");
const authController = require("../controllers/auth.controller");

authRouter
	.post("/", validateBody(schemas.userLoginSchema), authController.login)
	.post(
		"/register",
		validateBody(schemas.userSchema),
		authController.register
	);

module.exports = authRouter;
