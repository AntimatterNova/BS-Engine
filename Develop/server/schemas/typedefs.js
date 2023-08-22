const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
        bookCount: Int
        savedBooks: [Book]!  
    }
    type Book {
        _id: ID
        authors: [String]
        description: String
        bookId: String!
        image: String
        link: String
        title: String
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        users: [User]
        user(userId: ID!): User
        me: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(authors: [String]!, bookId: String!, title: String!, link: String, image: String, description: String): User
        removeBook(bookId: String!): User
    }
`;

module.exports = typeDefs;