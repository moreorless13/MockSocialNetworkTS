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
// import { sendConfirmationEmail, sendForgotPasswordEmail } from "../utils/transporter";
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
    Query: {
        users: (parent, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield User_1.default.find();
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
                    console.log('filtered list', filteredUsers);
                    const filterMe = filteredUsers.filter((user) => {
                        if ((me === null || me === void 0 ? void 0 : me.id) == (user === null || user === void 0 ? void 0 : user._id)) {
                            return;
                        }
                        else {
                            return user;
                        }
                    });
                    console.log(filterMe);
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
            console.log('i am here');
            console.log(userId);
            try {
                const user = yield User_1.default.findOne({ _id: userId });
                console.log(user);
                return user;
            }
            catch (error) {
                console.error(error);
            }
        }),
        me: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (context.user) {
                const user = yield User_1.default.findById({ _id: context.user.data._id });
                return user;
            }
        }),
        followers: () => __awaiter(void 0, void 0, void 0, function* () {
            const follower = yield User_1.default.find();
            console.log(follower);
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
                    console.log(newUser);
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
                    console.log(correctPassword);
                    if (!correctPassword) {
                        throw new apollo_server_core_1.AuthenticationError('Invalid credentials');
                    }
                    // if (user.role === 'Admin') {
                    //     const token = authorizedUser(user);
                    //     console.log(user)
                    //     return { token, user }
                    // } else {
                    //     const token = signToken(user)
                    //     return { token, user }
                    // }
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
                // sendForgotPasswordEmail(email, user._id)
            }
            catch (error) {
                console.error(error);
            }
        }),
        removeUser: (parent, { username, password }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (context.user) {
                    const user = yield User_1.default.findById({ _id: context.user.data._id });
                    console.log(user);
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
            var _a, _b;
            const user = yield User_1.default.findOne({ _id: _id });
            console.log('this is the user', user === null || user === void 0 ? void 0 : user.username);
            const me = yield User_1.default.findById({ _id: context.user.data._id });
            console.log('this is me', me);
            if (me === null || me === void 0 ? void 0 : me.following.id(user === null || user === void 0 ? void 0 : user._id)) {
                console.log('you already follow this user');
                return { user, me };
            }
            else {
                (_a = me === null || me === void 0 ? void 0 : me.following) === null || _a === void 0 ? void 0 : _a.push({ _id: user === null || user === void 0 ? void 0 : user._id, username: user === null || user === void 0 ? void 0 : user.username, email: user === null || user === void 0 ? void 0 : user.email });
                me === null || me === void 0 ? void 0 : me.save();
                (_b = user === null || user === void 0 ? void 0 : user.followers) === null || _b === void 0 ? void 0 : _b.push({ _id: me === null || me === void 0 ? void 0 : me._id, username: me === null || me === void 0 ? void 0 : me.username, email: me === null || me === void 0 ? void 0 : me.email });
                user === null || user === void 0 ? void 0 : user.save();
                return { user, me };
            }
        }),
        unfollowUser: (parent, _id, context) => __awaiter(void 0, void 0, void 0, function* () {
            var _c, _d;
            const user = yield User_1.default.findOne({ _id: _id });
            const me = yield User_1.default.findById({ _id: context.user.data._id });
            (_c = me === null || me === void 0 ? void 0 : me.following) === null || _c === void 0 ? void 0 : _c.pull({ _id: user === null || user === void 0 ? void 0 : user._id, username: user === null || user === void 0 ? void 0 : user.username, email: user === null || user === void 0 ? void 0 : user.email });
            me === null || me === void 0 ? void 0 : me.save();
            (_d = user === null || user === void 0 ? void 0 : user.followers) === null || _d === void 0 ? void 0 : _d.pull({ _id: me === null || me === void 0 ? void 0 : me._id, username: me === null || me === void 0 ? void 0 : me.username, email: me === null || me === void 0 ? void 0 : me.email });
            user === null || user === void 0 ? void 0 : user.save();
            return { me, user };
        }),
        removeFollower: (parent, _id, context) => __awaiter(void 0, void 0, void 0, function* () {
            var _e, _f;
            const user = yield User_1.default.findOne({ _id: _id });
            console.log(user);
            const me = yield User_1.default.findById({ _id: context.user.data._id });
            console.log(me);
            (_e = me === null || me === void 0 ? void 0 : me.followers) === null || _e === void 0 ? void 0 : _e.pull({ _id: user === null || user === void 0 ? void 0 : user._id, username: user === null || user === void 0 ? void 0 : user.username, email: user === null || user === void 0 ? void 0 : user.email });
            me === null || me === void 0 ? void 0 : me.save();
            (_f = user === null || user === void 0 ? void 0 : user.following) === null || _f === void 0 ? void 0 : _f.pull({ _id: me === null || me === void 0 ? void 0 : me._id, username: me === null || me === void 0 ? void 0 : me.username, email: me === null || me === void 0 ? void 0 : me.email });
            user === null || user === void 0 ? void 0 : user.save();
            return { me, user };
        })
    }
};
exports.default = resolvers;
