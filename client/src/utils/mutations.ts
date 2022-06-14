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