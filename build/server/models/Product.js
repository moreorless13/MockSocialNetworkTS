"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String },
    image: { type: String },
    price: { type: Number, required: true, min: 0.99 },
    quantity: { type: Number, required: true, min: 0, default: 0 }
});
const Product = (0, mongoose_1.model)('Product', schema);
exports.default = Product;
