"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Comment_1 = __importDefault(require("./Comment"));
const schema = new mongoose_1.Schema({
    text: { type: String, minlength: 1, maxlength: 255, trim: true },
    author: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
    comments: [Comment_1.default.schema]
}, { timestamps: true });
const Post = (0, mongoose_1.model)('Post', schema);
exports.default = Post;
