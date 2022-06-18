"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REMOVE_FOLLOWER = exports.UNFOLLOW_USER = exports.FOLLOW_USER = exports.REMOVE_USER = exports.UPDATE_PASSWORD = exports.FORGOT_PASSWORD = exports.LOGIN_USER = exports.ADD_USER = void 0;
const client_1 = require("@apollo/client");
exports.ADD_USER = (0, client_1.gql) `
    mutation addUser($username: String!, $email: String!, $password: String!, $dateOfBirth: Date!) {
        addUser(username: $username, email: $email, password: $password, dateOfBirth: $dateOfBirth) {
            user {
                _id
                username
            }
        }
    }
`;
exports.LOGIN_USER = (0, client_1.gql) `
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;
exports.FORGOT_PASSWORD = (0, client_1.gql) `
    mutation forgotPassword($email: String!) {
        forgotPassword(email: $email) {
            email
        }
    }
`;
exports.UPDATE_PASSWORD = (0, client_1.gql) `
    mutation updatePassword($userId: ID!, $oldPassword: String!, $newPassword: String!, $confirmationPassword: String!) {
        updatePassword(userId: $userId, oldPassword: $oldPassword, newPassword: $newPassword, confirmationPassword: $confirmationPassword) {
            _id
        }
    }
`;
exports.REMOVE_USER = (0, client_1.gql) `
    mutation removeUser($username: String!, $password: String!) {
        removeUser(username: $username, password: $password) {
            _id
        }
    }
`;
exports.FOLLOW_USER = (0, client_1.gql) `
    mutation followUser($_id: ID) {
        followUser(_id: $_id) {
            _id
            username
            email
        }
    }
`;
exports.UNFOLLOW_USER = (0, client_1.gql) `
    mutation unfollowUser($_id: ID) {
        unfollowUser(_id: $_id) {
            _id
            username
            email
        }
    }
`;
exports.REMOVE_FOLLOWER = (0, client_1.gql) `
    mutation removeFollower($_id: ID) {
        removeFollower(_id: $_id) {
            _id
            username
            email
        }
    }
`;
