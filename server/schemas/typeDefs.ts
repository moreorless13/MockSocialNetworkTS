import { gql } from 'apollo-server-express';

const typeDefs = gql`
    scalar Date
    scalar ObjectId

    
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
        posts: [Post]
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

    type Post {
        _id: ID
        text: String
        author: String
        createdAt: Date
        comments: [Comment]
    }

    type Comment {
        _id: ID
        text: String
        author: String
        createdAt: Date
        owner: ObjectId
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
        filterUsers: [User]
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
        removeFollower(_id: ID): followers
        addPost(text: String): Post
        removePost(postId: ID!): Post
        addComment(userId: ID!, postId: ID, commentText: String!): Comment
        removeComment(postId: ID!, commentId: ID!): Post

    }
`

export default typeDefs;