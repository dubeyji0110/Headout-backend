const productRouter = require("express").Router();

const { schemas, validateBody } = require("../../utils/SchemaValidator");
const productController = require("../controllers/product.controller");

productRouter
	.post("/", validateBody(schemas.productCreateSchema), productController.createProduct)
    .delete("/", validateBody(schemas.productDeleteSchema),productController.deleteProduct);

module.exports = productRouter;
