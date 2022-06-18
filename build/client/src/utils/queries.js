"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUERY_FOLLOWERS = exports.QUERY_ME = exports.QUERY_FILTER_USERS = exports.VERIFY_USER = exports.QUERY_USER = exports.QUERY_USERS = void 0;
const client_1 = require("@apollo/client");
exports.QUERY_USERS = (0, client_1.gql) `
    query users {
        users {
            _id
            username
            email
            accountStatus
            followers {
                _id
                username
                email
            }
            following {
                _id
                username
                email
            } 
        }
    }
`;
exports.QUERY_USER = (0, client_1.gql) `
    query user($userId: ID!) {
        user(userId: $userId) {
            _id
            username
            email
            dateOfBirth
            followers {
                _id
                username
                email
            }
            following {
                _id
                username
                email
            }
        }
    }
`;
exports.VERIFY_USER = (0, client_1.gql) `
    query verifyUser($userId: ID!) {
        verifyUser(userId: $userId) {
            _id
            username
        }
    }
`;
exports.QUERY_FILTER_USERS = (0, client_1.gql) `
    query filterUsers {
        filterUsers {
            _id
            username
            email
            followers {
                _id
                username
                email
            }
            following {
                _id 
                username
                email
            }
        }
    }
`;
exports.QUERY_ME = (0, client_1.gql) `
    {
        me {
            _id
            username
            email
            dateOfBirth
            followers {
                _id
                username
                email
            }
            following {
                _id
                username
                email
            }
        }
    }
`;
exports.QUERY_FOLLOWERS = (0, client_1.gql) `
    query followers($followers: ID!) {
        followers(followers: $followers) {
            username
            email
            followers
        }
    }
`;
