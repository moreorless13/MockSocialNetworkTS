"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = __importStar(require("bcrypt"));
const Post_1 = __importDefault(require("./Post"));
const schema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true, trim: true, minlength: 5 },
    email: { type: String, required: true, unique: true, match: [/.+@.+\..+/, 'Must match an email address'] },
    password: { type: String, required: true, minlength: 5 },
    dateOfBirth: { type: Date, required: true },
    accountStatus: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    role: { type: String, required: true, enum: ['Admin', 'User'], default: 'User' },
    followers: [{ _id: mongoose_1.Types.ObjectId, username: String, email: String }],
    following: [{ _id: mongoose_1.Types.ObjectId, username: String, email: String }],
    posts: [Post_1.default.schema]
}, { timestamps: true });
schema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew || this.isModified('password')) {
            const saltRounds = 10;
            this.password = yield bcrypt.hash(this.password, saltRounds);
        }
        next();
    });
});
schema.method('isCorrectPassword', function isCorrectPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(password, this.password);
    });
});
const User = (0, mongoose_1.model)('User', schema);
exports.default = User;
