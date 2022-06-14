import { gql } from 'apollo-server-express';

const typeDefs = gql`
    scalar Date

    type User {
        username: String!
        email: String!
        password: String!
        dateOfBirth: Date!
        accountStatus: String!
        role: String!
        createdAt: Date!
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
    }
`

export default typeDefs;