import { AuthenticationError } from "apollo-server-core";
import { GraphQLScalarType, Kind } from "graphql";
import User, { Ifollowers, Ifollowing } from '../models/User';
import { signToken } from "../utils/auth";
import { sendConfirmationEmail, sendForgotPasswordEmail } from "../utils/transporter";
import { ObjectId } from 'mongodb'
import Post from "../models/Post";
import Comment from "../models/Comment";

const ObjectIdScalar = new GraphQLScalarType({
    name: "ObjectId",
    description: "Mongo ObjectId scalar type",
    serialize(value: unknown): string {
        if(!(value instanceof ObjectId)) {
            throw new Error('ObjectIdScalar can only serialize ObjectId values')
        }
        return value.toHexString();
    },
    parseValue(value: unknown): ObjectId {
        if (typeof value !== "string") {
            throw new Error('ObjectIdScalar can only parse string values');
        }
        return new ObjectId(value)
    },
    parseLiteral(ast): ObjectId {
        if (ast.kind !== Kind.STRING) {
            throw new Error("ObjectIdScalar can only parse string values")
        }
        return new ObjectId(ast.value)
    }
});

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
    ObjectId: ObjectIdScalar,
    Query: {
        users: async (parent: unknown, context: any) => {
            return await User.find().populate({ path: 'posts.comments', populate: 'comments'})
        },
        filterUsers: async (parent: unknown, args: any, context: any) => {
            if (context.user) {
                try {
                    const me = await User.findById({ _id: context.user.data._id })
                    const allUsers = await User.find()
                    const filteredUsers = allUsers.filter((user: any) => {
                        const iFollow = me?.following?.map((following: any) => {
                            if(user?._id == following?.id) {
                                return null;
                            } else {
                                return user;
                            }
                        })
                        if (iFollow?.includes(null)) {
                            iFollow?.filter((user: any) => {
                                return !null
                            })
                        } else {
                            console.log(iFollow)
                            return user;
                        }  
                    })
                    const filterMe = filteredUsers.filter((user: any) => {
                        if (me?.id == user?._id) {
                            return;
                        } else {
                            return user;
                        }
                    })  
                    return filterMe
                } catch (error) {
                    console.error(error)
                }
            } else {
                return await User.find()
            }
            
        },
        verifyUser: async (parent: unknown, { userId }: any) => {
            const user = await User.findByIdAndUpdate({ _id: userId }, { $set: { accountStatus: 'Active' } }, { new: true });
            return user;
        },
        user: async (parent: unknown, { userId }: any, context: any) => {
            try {
                const user = await User.findOne({ _id: userId })
                return user
            } catch (error) {
                console.error(error)
            }
        },  
        me: async (parent: unknown, args: any, context: any) => {
            if (context.user) {
                try {
                    const user = await User.findById({ _id: context.user.data._id })?.populate({ path: 'posts.comments', populate: 'comments' });
                    return user
                } catch (error) {
                    console.error(error)
                }
            } else {
                throw new AuthenticationError('You are not authorized to view this account');
            }
        },
        followers: async () => {
            const follower = await User.find();

            return follower
        }, 
        following: async () => {
            
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
                    // sendConfirmationEmail(username, email, newUser._id);
                    return newUser
                }
            } catch (error) {
                console.error(error);
            }
        },
        login: async (parent: unknown, { username, password }: any) => {
            try {
                const user = await User.findOne({ username });
                // if (user?.accountStatus !== 'Active') {
                //     throw new AuthenticationError('Please check your email for account confirmation.')
                // }
                if (!user) {
                    throw new AuthenticationError('User does not exist')
                } else {
                    const correctPassword = await user.isCorrectPassword(password);
                    if(!correctPassword){
                        throw new AuthenticationError('Invalid credentials')
                    }
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
        followUser: async (parent: unknown, _id: any, context: any) => {
            const user = await User.findOne({ _id: _id});
            const me = await User.findById({ _id: context.user.data._id })
            if (me?.following.id(user?._id)){
                return { user, me }
            } else {
                me?.following?.push({ _id: user?._id, username: user?.username, email: user?.email })
                me?.save()
                user?.followers?.push({ _id: me?._id, username: me?.username, email: me?.email});
                user?.save()
                return { user, me };
            }
        },
        unfollowUser: async (parent: unknown, _id: any, context: any) => {
            const user = await User.findOne({ _id: _id });
            const me = await User.findById({ _id: context.user.data._id })
            me?.following?.pull({ _id: user?._id, username: user?.username, email: user?.email })
            me?.save()
            user?.followers?.pull({ _id: me?._id, username: me?.username, email: me?.email});
            user?.save();
            return { me, user };
        },
        removeFollower: async (parent: unknown, _id: any, context: any) => {
            if (context.user) {
                try {
                    const user = await User.findOne({ _id: _id });
                    const me = await User.findById({ _id: context.user.data._id });
                    me?.followers?.pull({ _id: user?._id, username: user?.username, email: user?.email });
                    me?.save()
                    user?.following?.pull({ _id: me?._id, username: me?.username, email: me?.email });
                    user?.save()
                    return { me, user };
                } catch (error) {
                    console.error(error)
                }
            } else {
                throw new AuthenticationError('You are not authorized to remove followers from this account!')
            }
        },
        addPost: async (parent: unknown, { text }: any, context: any) => {
            if (context.user) {
                try {
                    const user = await User.findById({ _id: context.user.data._id })
                    const post = await Post.create({ text: text, author: user?.username });
                    user?.posts?.push(post);
                    user?.save();
                    return post;
                } catch (error) {
                    console.error(error)
                }
            } else {
                throw new AuthenticationError('You are not authorized to post on this account');
            }
        }, 
        removePost: async (parent: unknown, { postId }: any, context: any) => {
            if (context.user) {
                try {
                    const user = await User.findById({ _id: context.user.data._id })
                    const postToRemove = await Post.findOne({ _id: postId, author: context.user.data.username });
                    // console.log("this is the post to remove", postToRemove)
                    const postCommentsIDs = postToRemove?.comments?.map((comment: any) => {
                        console.log(comment?._id)
                        return comment?._id
                    })
                    console.log(postCommentsIDs)
                    const commentsToDelete = postCommentsIDs?.map(async (id: ObjectId) => {
                        console.log('deleting comment', id)
                        let deletingComment = await Comment.findByIdAndDelete({ _id: id }) 
                        console.log(deletingComment)
                        return deletingComment
                    })
                    console.log(commentsToDelete)
                    
                    
                    user?.posts?.pull(postToRemove);
                    user?.save();
                    await Post.findByIdAndDelete({ _id: postId })
                    return postToRemove;
                } catch (error) {
                    console.error(error);
                }
            } else {
                throw new AuthenticationError('You are not authorized to remove this post');
            }
        }, 
        addComment: async (parent: unknown, { userId, postId, text }: any, context: any) => {
            if (context.user) {
                try {
                    const me = await User.findById({ _id: context.user.data._id })
                    const user = await User.findById({ _id: userId })
                    const comment = await Comment.create({ text: text, author: me?.username, owner: me?._id })
                    const postToCommentOn = user?.posts?.id(postId);
                    postToCommentOn?.comments?.push(comment);
                    user?.save()
                    return comment;
                } catch (error) {
                    console.error(error)
                }
            } else {
                throw new AuthenticationError('You are not authorized to comment on this post')
            }
        }

    }
};
export default resolvers;