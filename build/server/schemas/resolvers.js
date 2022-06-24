"use strict";
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
const apollo_server_core_1 = require("apollo-server-core");
const graphql_1 = require("graphql");
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../utils/auth");
const transporter_1 = require("../utils/transporter");
const mongodb_1 = require("mongodb");
const Post_1 = __importDefault(require("../models/Post"));
const Comment_1 = __importDefault(require("../models/Comment"));
const ObjectIdScalar = new graphql_1.GraphQLScalarType({
    name: "ObjectId",
    description: "Mongo ObjectId scalar type",
    serialize(value) {
        if (!(value instanceof mongodb_1.ObjectId)) {
            throw new Error('ObjectIdScalar cna only serialize ObjectId values');
        }
        return value.toHexString();
    },
    parseValue(value) {
        if (typeof value !== "string") {
            throw new Error('ObjectIdScalar can only parse string values');
        }
        return new mongodb_1.ObjectId(value);
    },
    parseLiteral(ast) {
        if (ast.kind !== graphql_1.Kind.STRING) {
            throw new Error("ObjectIdScalar can only parse string values");
        }
        return new mongodb_1.ObjectId(ast.value);
    }
});
const dateScalar = new graphql_1.GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        return value.getTime(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === graphql_1.Kind.INT) {
            return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    },
});
const resolvers = {
    Date: dateScalar,
    ObjectId: ObjectIdScalar,
    Query: {
        users: (parent, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield User_1.default.find().populate({ path: 'posts.comments', populate: 'comments' });
        }),
        filterUsers: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (context.user) {
                try {
                    const me = yield User_1.default.findById({ _id: context.user.data._id });
                    const allUsers = yield User_1.default.find();
                    const filteredUsers = allUsers.filter((user) => {
                        var _a;
                        const iFollow = (_a = me === null || me === void 0 ? void 0 : me.following) === null || _a === void 0 ? void 0 : _a.map((following) => {
                            if ((user === null || user === void 0 ? void 0 : user._id) == (following === null || following === void 0 ? void 0 : following.id)) {
                                return null;
                            }
                            else {
                                return user;
                            }
                        });
                        if (iFollow === null || iFollow === void 0 ? void 0 : iFollow.includes(null)) {
                            iFollow === null || iFollow === void 0 ? void 0 : iFollow.filter((user) => {
                                return !null;
                            });
                        }
                        else {
                            console.log(iFollow);
                            return user;
                        }
                    });
                    const filterMe = filteredUsers.filter((user) => {
                        if ((me === null || me === void 0 ? void 0 : me.id) == (user === null || user === void 0 ? void 0 : user._id)) {
                            return;
                        }
                        else {
                            return user;
                        }
                    });
                    return filterMe;
                }
                catch (error) {
                    console.error(error);
                }
            }
            else {
                return yield User_1.default.find();
            }
        }),
        verifyUser: (parent, { userId }) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield User_1.default.findByIdAndUpdate({ _id: userId }, { $set: { accountStatus: 'Active' } }, { new: true });
            return user;
        }),
        user: (parent, { userId }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findOne({ _id: userId });
                return user;
            }
            catch (error) {
                console.error(error);
            }
        }),
        me: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (context.user) {
                try {
                    const user = yield ((_a = User_1.default.findById({ _id: context.user.data._id })) === null || _a === void 0 ? void 0 : _a.populate({ path: 'posts.comments', populate: 'comments' }));
                    return user;
                }
                catch (error) {
                    console.error(error);
                }
            }
            else {
                throw new apollo_server_core_1.AuthenticationError('You are not authorized to view this account');
            }
        }),
        followers: () => __awaiter(void 0, void 0, void 0, function* () {
            const follower = yield User_1.default.find();
            return follower;
        }),
        following: () => __awaiter(void 0, void 0, void 0, function* () {
        })
    },
    Mutation: {
        addUser: (parent, { username, email, password, dateOfBirth }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const existingUser = yield User_1.default.findOne({ username } || { email });
                if (existingUser) {
                    throw new apollo_server_core_1.AuthenticationError('User already exists');
                }
                else {
                    const newUser = yield User_1.default.create({ username, email, password, dateOfBirth });
                    // sendConfirmationEmail(username, email, newUser._id);
                    return newUser;
                }
            }
            catch (error) {
                console.error(error);
            }
        }),
        login: (parent, { username, password }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findOne({ username });
                // if (user?.accountStatus !== 'Active') {
                //     throw new AuthenticationError('Please check your email for account confirmation.')
                // }
                if (!user) {
                    throw new apollo_server_core_1.AuthenticationError('User does not exist');
                }
                else {
                    const correctPassword = yield user.isCorrectPassword(password);
                    if (!correctPassword) {
                        throw new apollo_server_core_1.AuthenticationError('Invalid credentials');
                    }
                    const token = (0, auth_1.signToken)(user);
                    return { token, user };
                }
            }
            catch (error) {
                console.error(error);
            }
        }),
        updatePassword: (parent, { userId, oldPassword, newPassword, confirmationPassword }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (newPassword !== confirmationPassword) {
                    throw new apollo_server_core_1.AuthenticationError('Passwords must match!');
                }
                const user = yield User_1.default.findById({ _id: context.user.data._id });
                if (!user) {
                    throw new apollo_server_core_1.AuthenticationError('User does not exist');
                }
                const correctPassword = user.isCorrectPassword(oldPassword);
                if (!correctPassword) {
                    throw new apollo_server_core_1.AuthenticationError('You must enter correct password!');
                }
                else {
                    user.password = newPassword;
                    yield user.save({ timestamps: true });
                    return user;
                }
            }
            catch (error) {
                console.error(error);
            }
        }),
        forgotPassword: (parent, { email }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findOne({ email });
                if (!user) {
                    throw new apollo_server_core_1.AuthenticationError('User with that email does not exist');
                }
                (0, transporter_1.sendForgotPasswordEmail)(email, user._id);
            }
            catch (error) {
                console.error(error);
            }
        }),
        removeUser: (parent, { username, password }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (context.user) {
                    const user = yield User_1.default.findById({ _id: context.user.data._id });
                    const correctPassword = yield (user === null || user === void 0 ? void 0 : user.isCorrectPassword(password));
                    if (!correctPassword || username !== (user === null || user === void 0 ? void 0 : user.username)) {
                        throw new apollo_server_core_1.AuthenticationError('Must provide correct credentials to delete account!');
                    }
                    else {
                        return yield User_1.default.findByIdAndDelete({ _id: context.user.data._id });
                    }
                }
            }
            catch (error) {
                console.error(error);
            }
        }),
        followUser: (parent, _id, context) => __awaiter(void 0, void 0, void 0, function* () {
            var _b, _c;
            const user = yield User_1.default.findOne({ _id: _id });
            const me = yield User_1.default.findById({ _id: context.user.data._id });
            if (me === null || me === void 0 ? void 0 : me.following.id(user === null || user === void 0 ? void 0 : user._id)) {
                return { user, me };
            }
            else {
                (_b = me === null || me === void 0 ? void 0 : me.following) === null || _b === void 0 ? void 0 : _b.push({ _id: user === null || user === void 0 ? void 0 : user._id, username: user === null || user === void 0 ? void 0 : user.username, email: user === null || user === void 0 ? void 0 : user.email });
                me === null || me === void 0 ? void 0 : me.save();
                (_c = user === null || user === void 0 ? void 0 : user.followers) === null || _c === void 0 ? void 0 : _c.push({ _id: me === null || me === void 0 ? void 0 : me._id, username: me === null || me === void 0 ? void 0 : me.username, email: me === null || me === void 0 ? void 0 : me.email });
                user === null || user === void 0 ? void 0 : user.save();
                return { user, me };
            }
        }),
        unfollowUser: (parent, _id, context) => __awaiter(void 0, void 0, void 0, function* () {
            var _d, _e;
            const user = yield User_1.default.findOne({ _id: _id });
            const me = yield User_1.default.findById({ _id: context.user.data._id });
            (_d = me === null || me === void 0 ? void 0 : me.following) === null || _d === void 0 ? void 0 : _d.pull({ _id: user === null || user === void 0 ? void 0 : user._id, username: user === null || user === void 0 ? void 0 : user.username, email: user === null || user === void 0 ? void 0 : user.email });
            me === null || me === void 0 ? void 0 : me.save();
            (_e = user === null || user === void 0 ? void 0 : user.followers) === null || _e === void 0 ? void 0 : _e.pull({ _id: me === null || me === void 0 ? void 0 : me._id, username: me === null || me === void 0 ? void 0 : me.username, email: me === null || me === void 0 ? void 0 : me.email });
            user === null || user === void 0 ? void 0 : user.save();
            return { me, user };
        }),
        removeFollower: (parent, _id, context) => __awaiter(void 0, void 0, void 0, function* () {
            var _f, _g;
            if (context.user) {
                try {
                    const user = yield User_1.default.findOne({ _id: _id });
                    const me = yield User_1.default.findById({ _id: context.user.data._id });
                    (_f = me === null || me === void 0 ? void 0 : me.followers) === null || _f === void 0 ? void 0 : _f.pull({ _id: user === null || user === void 0 ? void 0 : user._id, username: user === null || user === void 0 ? void 0 : user.username, email: user === null || user === void 0 ? void 0 : user.email });
                    me === null || me === void 0 ? void 0 : me.save();
                    (_g = user === null || user === void 0 ? void 0 : user.following) === null || _g === void 0 ? void 0 : _g.pull({ _id: me === null || me === void 0 ? void 0 : me._id, username: me === null || me === void 0 ? void 0 : me.username, email: me === null || me === void 0 ? void 0 : me.email });
                    user === null || user === void 0 ? void 0 : user.save();
                    return { me, user };
                }
                catch (error) {
                    console.error(error);
                }
            }
            else {
                throw new apollo_server_core_1.AuthenticationError('You are not authorized to remove followers from this account!');
            }
        }),
        addPost: (parent, { text }, context) => __awaiter(void 0, void 0, void 0, function* () {
            var _h;
            if (context.user) {
                try {
                    const user = yield User_1.default.findById({ _id: context.user.data._id });
                    const post = yield Post_1.default.create({ text: text, author: user === null || user === void 0 ? void 0 : user.username });
                    (_h = user === null || user === void 0 ? void 0 : user.posts) === null || _h === void 0 ? void 0 : _h.push(post);
                    user === null || user === void 0 ? void 0 : user.save();
                    return post;
                }
                catch (error) {
                    console.error(error);
                }
            }
            else {
                throw new apollo_server_core_1.AuthenticationError('You are not authorized to post on this account');
            }
        }),
        removePost: (parent, { postId }, context) => __awaiter(void 0, void 0, void 0, function* () {
            var _j;
            if (context.user) {
                try {
                    const user = yield User_1.default.findById({ _id: context.user.data._id });
                    const postToRemove = yield Post_1.default.findOne({ _id: postId, author: context.user.data.username });
                    (_j = user === null || user === void 0 ? void 0 : user.posts) === null || _j === void 0 ? void 0 : _j.pull(postToRemove);
                    user === null || user === void 0 ? void 0 : user.save();
                    return postToRemove;
                }
                catch (error) {
                    console.error(error);
                }
            }
            else {
                throw new apollo_server_core_1.AuthenticationError('You are not authorized to remove this post');
            }
        }),
        addComment: (parent, { userId, postId, commentText }, context) => __awaiter(void 0, void 0, void 0, function* () {
            var _k, _l;
            if (context.user) {
                try {
                    const me = yield User_1.default.findById({ _id: context.user.data._id });
                    const user = yield User_1.default.findById({ _id: userId });
                    const comment = yield Comment_1.default.create({ text: commentText, author: me === null || me === void 0 ? void 0 : me.username, owner: me === null || me === void 0 ? void 0 : me._id });
                    const postToCommentOn = (_k = user === null || user === void 0 ? void 0 : user.posts) === null || _k === void 0 ? void 0 : _k.id(postId);
                    (_l = postToCommentOn === null || postToCommentOn === void 0 ? void 0 : postToCommentOn.comments) === null || _l === void 0 ? void 0 : _l.push(comment);
                    user === null || user === void 0 ? void 0 : user.save();
                    return comment;
                }
                catch (error) {
                    console.error(error);
                }
            }
            else {
                throw new apollo_server_core_1.AuthenticationError('You are not authorized to comment on this post');
            }
        })
    }
};
exports.default = resolvers;
