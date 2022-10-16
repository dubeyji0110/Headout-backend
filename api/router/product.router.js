const productRouter = require("express").Router();

const { schemas, validateBody } = require("../../utils/SchemaValidator");
const productController = require("../controllers/product.controller");

productRouter
	.post("/", validateBody(schemas.productCreateSchema), productController.createProduct)
    .delete("/:productId", validateBody(schemas.productDeleteSchema),productController.deleteProduct)
    .patch("/:productId", validateBody(schemas.productUpdateSchema), productController.updateProduct)
    .get("/all", productController.getAllProducts)
    .get("/user/:userId", productController.getUserProducts)

module.exports = productRouter;
