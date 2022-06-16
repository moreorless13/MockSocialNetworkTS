import { AuthenticationError } from "apollo-server-core";
import { GraphQLScalarType, Kind } from "graphql";
import User from '../models/User';
import { signToken, authorizedUser } from "../utils/auth";
import * as bcrypt from 'bcrypt';
import { sendConfirmationEmail, sendForgotPasswordEmail } from "../utils/transporter";

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value: any) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value: any) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const resolvers = {
    Date: dateScalar,
    Query: {
        users: async (parent: unknown, context: any) => {
            return await User.find()
        },
        user: async (parent: unknown, { userId }: any) => {
            const user = await User.findByIdAndUpdate({ _id: userId }, { $set: { accountStatus: 'Active' } }, { new: true });
            return user;
        },
        me: async (parent: unknown, args: any, context: any) => {
            if (context.user) {
                const user = await User.findById({ _id: context.user.data._id }).populate({ path: 'followers.user', populate: 'user' })
                console.log(user)
                return user
            }
        }
    },
    Mutation: {
        addUser: async (parent: unknown, { username, email, password, dateOfBirth }: any) => {
            try {
                const existingUser = await User.findOne({ username } || { email });
                if (existingUser) {
                    throw new AuthenticationError('User already exists')
                } else {
                    const newUser = await User.create({ username, email, password, dateOfBirth });
                    sendConfirmationEmail(username, email, newUser._id);
                    console.log(newUser)
                    return newUser
                }
            } catch (error) {
                console.error(error);
            }
        },
        login: async (parent: unknown, { username, password }: any) => {
            try {
                const user = await User.findOne({ username });
                if (user?.accountStatus !== 'Active') {
                    throw new AuthenticationError('Please check your email for account confirmation.')
                }
                if (!user) {
                    throw new AuthenticationError('User does not exist')
                } else {
                    const correctPassword = await user.isCorrectPassword(password);
                    console.log(correctPassword)
                    if(!correctPassword){
                        throw new AuthenticationError('Invalid credentials')
                    }

                    // if (user.role === 'Admin') {
                    //     const token = authorizedUser(user);
                    //     console.log(user)
                    //     return { token, user }
                    // } else {
                    //     const token = signToken(user)
                    //     return { token, user }
                    // }
                    const token = signToken(user)
                    return { token, user }
                }
            } catch (error) {
                console.error(error)
            }
        },
        updatePassword: async (parent: unknown, { userId, oldPassword, newPassword, confirmationPassword }: any, context: any) => {
            try {
               if (newPassword !== confirmationPassword) {
                    throw new AuthenticationError('Passwords must match!')
                }
                const user = await User.findById({ _id: context.user.data._id });
                if (!user) {
                    throw new AuthenticationError('User does not exist')
                } 
                const correctPassword = user.isCorrectPassword(oldPassword)
                if (!correctPassword) {
                    throw new AuthenticationError('You must enter correct password!')
                } else {
                    user.password = newPassword;
                    await user.save({ timestamps: true });
                    
                    return user
                }
            } catch (error) {
                console.error(error)
            }
        },
        forgotPassword: async (parent: unknown, { email }: any) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    throw new AuthenticationError('User with that email does not exist')
                }
                sendForgotPasswordEmail(email, user._id)
            } catch (error) {
                console.error(error)  
            }
        },
        removeUser: async (parent: unknown, { username, password }: any, context: any) => {
            try {
                if (context.user) {
                    const user = await User.findById({ _id: context.user.data._id });
                    console.log(user)
                    const correctPassword = await user?.isCorrectPassword(password);
                    if (!correctPassword || username !== user?.username) {
                        throw new AuthenticationError('Must provide correct credentials to delete account!')
                    } else {
                        return await User.findByIdAndDelete({ _id: context.user.data._id })
                    }
                }
            } catch (error) {
                console.error(error)
            }
        },
        followUser: async (parent: unknown, { followers }: any, context: any) => {
            console.log(followers)
            console.log(context.user)
            const user = await User.findById(followers);
            console.log('this is the user to follow ', user)
            const me = await User.findById({ _id: context.user.data._id })
            console.log('this is me', me)
            me?.following.addToSet(user?.id)
            me?.save()
            user?.followers.addToSet(me?._id)
            user?.save()
            console.log('people I follow', me?.following)
            console.log('users followers', user?.followers)
            return me;
        },
        unfollowUser: async (parent: unknown, { following }: any, context: any) => {
            const user = await User.findById(following);
            console.log('user to unfollow', user)
            const me = await User.findById({ _id: context.user.data._id })
            console.log('me', me)
            me?.following.find(following)?.remove(following)
            return me;
        }

    }
};
export default resolvers;