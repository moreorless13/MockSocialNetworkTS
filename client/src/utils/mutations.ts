import { gql } from '@apollo/client'

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!, $dateOfBirth: Date!) {
        addUser(username: $username, email: $email, password: $password, dateOfBirth: $dateOfBirth) {
            user {
                _id
                username
            }
        }
    }
`

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`

export const FORGOT_PASSWORD = gql`
    mutation forgotPassword($email: String!) {
        forgotPassword(email: $email) {
            email
        }
    }
`

export const UPDATE_PASSWORD = gql`
    mutation updatePassword($userId: ID!, $oldPassword: String!, $newPassword: String!, $confirmationPassword: String!) {
        updatePassword(userId: $userId, oldPassword: $oldPassword, newPassword: $newPassword, confirmationPassword: $confirmationPassword) {
            _id
        }
    }
`

export const REMOVE_USER = gql`
    mutation removeUser($username: String!, $password: String!) {
        removeUser(username: $username, password: $password) {
            _id
        }
    }
`

export const FOLLOW_USER = gql`
    mutation followUser($_id: ID) {
        followUser(_id: $_id) {
            _id
            username
            email
        }
    }
`

export const UNFOLLOW_USER = gql`
    mutation unfollowUser($_id: ID) {
        unfollowUser(_id: $_id) {
            _id
            username
            email
        }
    }
`
export const REMOVE_FOLLOWER = gql`
    mutation removeFollower($_id: ID) {
        removeFollower(_id: $_id) {
            _id
            username
            email
        }
    }
`

export const ADD_POST = gql`
    mutation addPost($text: String!) {
        addPost(text: $text) {
            _id
            text
            author
            createdAt
        }
    }
`

export const REMOVE_POST = gql`
    mutation removePost($postId: ObjectId) {
        removePost(postId: $postId) {
            _id
        }
    }
`
export const ADD_COMMENT = gql`
    mutation addComment($userId: ID!, $postId: ID!, $commentText: String!) {
        addComment(userId: $userId, postId: $postId, commentText: $commentText) {
            _id
        }
    }
`