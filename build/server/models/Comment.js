"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    text: { type: String, required: true, minlength: 1, maxlength: 255 },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
const Comment = (0, mongoose_1.model)('Comment', schema);
exports.default = Comment;
