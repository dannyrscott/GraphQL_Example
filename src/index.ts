import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { v6} from 'uuid';
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

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

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
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
export interface Person {
    id: string;
    name: string;
    email: string;
    phone: string;
  }
  
export interface Book {
id: string;
title: string;
author: string;
checkedOutBy?: Person; 
}
const books = [
    {
      id: "1",
      title: 'The Awakening',
      author: 'Kate Chopin',
      isCheckedOut: false,
      checkoutOutBy: null,
      
    },
    {
      id: "2",
      title: 'City of Glass',
      author: 'Paul Auster',
      isCheckedOut: false,
      checkedOutBy: null
    },
  ];

  const persons = [
    {
        id: "abc-123",
        firstName: 'Danny',
        lastName: 'Scott',
        emailAddress: 'danny@scott.net',
        phoneNumber: '1111112222'
    },
    {
        id: "cde-123",
        firstName: 'Someone',
        lastName: 'Else',
        emailAddress: 'email@address.com',
        phoneNumber: '2222222222'
    }
  ]

  // Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      books: () => books,
      book: (_: any, args: {id: string}) => {
        const book = books.find((b) => {
            return b.id === args.id
        })
        if (!book) throw new Error("Book not found");
        
        return book
      }
    },

    Mutation: {
        checkoutBook: (_: any, args: {bookId: string, personId: string}) => {
            const book = books.find((b) => b.id === args.bookId);
            if (!book) throw new Error("Book not found");

            if (book.isCheckedOut)
                throw new Error("Book already checked out");

            const person = persons.find((p) => p.id === args.personId);
            if (!person) throw new Error("Person not found");

            book.checkedOutBy = person;
            book.isCheckedOut = true;
            return book;
        },
        returnBook: (_: any, args: {bookId:string}) => {
            const book = books.find((b) => b.id === args.bookId);
            if (!book) throw new Error("Book not found");

            if (!book.isCheckedOut) {
                throw new Error("Book not checked out")
            }
            book.isCheckedOut = false;
            book.checkedOutBy = null;
            return book
        },
        createPerson: (_: any, args: any) => {
            const newPerson = {
              id: v6(),
              ...args
            };
            persons.push(newPerson);
            return newPerson;
          },
      
          createBook: (_: any, args: any) => {
            const newBook = {
              id: String(books.length + 1),
              ...args,
              isCheckedOut: false
            };
            books.push(newBook);
            return newBook;
          },
    }
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);