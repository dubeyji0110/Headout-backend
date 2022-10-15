const Product = require('../../models/product')
const User = require("../../models/user");
var ObjectId = require('mongoose').Types.ObjectId;


module.exports = {
    async createProduct(req, res, next) {
        try {
            const { name, description, image, userId } = req.body;
            const user = await User.findById(userId);
            if (!user) return res.status(404).send({ message: "No matching user found" });
            const prod = {
                name,
                description,
                image,
                userId,
            }
            const newProduct = await new Product(prod).save();
            if (newProduct) return res.status(200).json({message:"Product created successfully",newProduct});
            return res.status(400).send({ message: "Product failed to add" });
        } catch (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }
    },
    async deleteProduct(req, res, next) {
        try {
            const { productId, userId } = req.body
            const product = await Product.findById(productId)
            if (!product) return res.status(404).send("Product not found");
            if (product.userId == userId) {
                const deletedprod = await Product.remove(product)
                if (deletedprod) return res.status(200).send({ message: "Product removed successfully" })
            }
            return res.status(400).send("Not authorized to delete product");
        } catch (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }
    },
    async updateProduct(req, res, next) {
        try {
            const { productId, userId } = req.body
            const product = await Product.findById(productId)
            if (!product) return res.status(404).send("Product not found");
            if (product.userId == userId) {
                for(key in req.body){
                    product[key] = req.body[key];
                }
                await product.save();
                return res.status(200).json({message:"Product saved successfully",product});
            }
            return res.status(400).send("Product update failed");

        }
        catch (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }
    },
    async getAllProducts(req, res, next) {
        try {
            const product = await Product.find();
            if(product) return res.status(200).json(product)
            return res.status(400).send("Products not found");
        }
        catch (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }
    },
    async getUserProducts(req, res, next) {
        try {
            const userId = req.params.userId
            const product = await Product.find({userId: userId});
            if(product) return res.status(200).json(product)
            return res.status(400).send("Products not found");
        }
        catch (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }
    },
};
