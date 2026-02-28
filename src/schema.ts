export const typeDefs = `#graphql
    #Person Type, who can check out Books
    type Person {
        id: ID!
        firstName: String!
        lastName: String!
        emailAddress: String!
        phoneNumber: String!
    }
    # This "Book" type defines the queryable fields for every book in our data source.
    type Book {
        id: ID!
        title: String!
        author: String!
        isCheckedOut: Boolean!
        checkedOutBy: Person
    }

    type Query {
        books: [Book]
        book(id: ID!): Book
    }

    type Mutation {
        checkoutBook(bookId: ID!, personId: ID!): Book!
        returnBook(bookId: ID!): Book!
        createPerson(firstName: String!, lastName: String!, email: String!, phone: String!): Person!
        createBook(title: String!, author: String!): Book!    
    }
`;