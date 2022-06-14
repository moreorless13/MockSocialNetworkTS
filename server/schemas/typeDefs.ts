import { gql } from 'apollo-server-express';

const typeDefs = gql`
    scalar Date

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        dateOfBirth: Date!
        accountStatus: String!
        role: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        user(userId: ID!): User
        users: [User]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!, dateOfBirth: Date!): Auth
        login(username: String!, password: String!): Auth
        updatePassword(userId: ID!, oldPassword: String!, newPassword: String!, confirmationPassword: String!): User
        forgotPassword(email: String!): User
        removeUser(username: String!, password: String!): User
    }
`

export default typeDefs;