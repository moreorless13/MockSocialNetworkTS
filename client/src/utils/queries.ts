import { gql } from '@apollo/client'

export const QUERY_USERS = gql`
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
`

export const QUERY_USER = gql`
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
            posts {
                _id
                text
                author
                createdAt
                comments {
                    _id
                    text
                    author
                    createdAt
                    owner
                }
            }
        }
    }
`

export const VERIFY_USER = gql`
    query verifyUser($userId: ID!) {
        verifyUser(userId: $userId) {
            _id
            username
        }
    }
`

export const QUERY_FILTER_USERS = gql`
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
`

export const QUERY_ME = gql`
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
            posts {
                _id
                text
                author
                createdAt
                comments {
                    _id
                    text
                    author
                    createdAt
                    owner
                }
            }
        }
    }
`

export const QUERY_FOLLOWERS = gql`
    query followers($followers: ID!) {
        followers(followers: $followers) {
            username
            email
            followers
        }
    }
`