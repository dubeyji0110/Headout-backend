const authRouter = require("express").Router();

const { schemas, validateBody } = require("../../utils/SchemaValidator");
const authController = require("../controllers/auth.controller");

authRouter
	.post("/", validateBody(schemas.userLoginSchema), authController.login)
	.post(
		"/register",
		validateBody(schemas.userRegisterSchema),
		authController.register
	);

module.exports = authRouter;
