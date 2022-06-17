import { gql } from 'apollo-server-express';

const typeDefs = gql`
    scalar Date
    input UserInput {
        username: String!
        email: String!
        password: String!
        dateOfBirth: Date!
        followers: ID
        following: ID
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        dateOfBirth: Date
        accountStatus: String
        role: String
        followers: [followers]
        following: [following]
    }

    type followers {
        _id: ID
        username: String
        email: String
       
    }

    type following {
        _id: ID
        username: String
        email: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        user(userId: ID!): User
        verifyUser(userId: ID!): User
        users: [User]
        followers: [User]
        following: [User]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!, dateOfBirth: Date!): Auth
        login(username: String!, password: String!): Auth
        updatePassword(userId: ID!, oldPassword: String!, newPassword: String!, confirmationPassword: String!): User
        forgotPassword(email: String!): User
        removeUser(username: String!, password: String!): User
        followUser(_id: ID): following
        unfollowUser(_id: ID): following

    }
`

export default typeDefs;