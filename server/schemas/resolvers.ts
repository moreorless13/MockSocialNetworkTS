import { AuthenticationError } from "apollo-server-core";
import { GraphQLScalarType, Kind } from "graphql";
import User from '../models/User';
import { signToken } from "../utils/auth";

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
        users: async () => {
            return await User.find()
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
                if (!user) {
                    throw new AuthenticationError('User does not exist')
                } else {
                    const correctPassword = user.isCorrectPassword(password);
                    if(!correctPassword){
                        throw new AuthenticationError('Invalid credentials')
                    }

                    const token = signToken(user);
                    console.log(user)
                    console.log(`${user.username} logged in`)
                    return { token, user }
                }
            } catch (error) {
                console.error(error)
            }
        }
    }
};
export default resolvers;