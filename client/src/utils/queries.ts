import { gql } from '@apollo/client'

export const QUERY_USERS = gql`
    query users {
        users {
            _id
            username
            email
            accountStatus
            followers
            following
        }
    }
`

export const QUERY_USER = gql`
    query user($userId: ID!) {
        user(userId: $userId) {
            _id
            username
        }
    }
`

export const QUERY_ME = gql`
    {
        me {
            username
            email
        }
    }
`