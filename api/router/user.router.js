const userRouter = require("express").Router();

const jwt = require("../../utils/jwt");
const { validateBody, schemas } = require("../../utils/SchemaValidator");
const userController = require("../controllers/user.controller");

userRouter
	.get("/", jwt.verifyUser, userController.getUserData)
	.get("/location", jwt.verifyUser, userController.getUserLocation)
	.patch(
		"/update",
		jwt.verifyUser,
		validateBody(schemas.userSchema),
		userController.updateUser
	);

module.exports = userRouter;
