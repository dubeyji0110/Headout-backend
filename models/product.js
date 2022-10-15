const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        image: {
            type: String,
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model(mongoose.models.Product || 'Product', ProductSchema);