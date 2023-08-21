import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($authors: [String]!, $bookId: String!, $title: String!, $link: String, $image: String, $description: String) {
        saveBook(authors: $authors, bookId: $bookId, title: $title, link: $link, image: $image, description: $description) {
            username
            email
            _id
            bookCount
            savedBooks {
                _id
                authors
                bookId
                description
                image
                link
                title
            }
        }
    }
`;


export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            _id
            bookCount
            email
            username
            savedBooks {
                _id
                authors
                bookId
                description
                link
                title
                image
            }
        }
    }
`;