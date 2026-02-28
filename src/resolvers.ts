import { v6} from 'uuid';
import {books, persons} from './data.js'

export const resolvers = {
    Query: {
      books: () => books,
      book: (_: any, args: {id: string}) => {
        const book = books.find((b) => {
            return b.id === args.id
        })
        if (!book) {
            throw new Error("Book not found");
        }
        
        return book
      }
    },

    Mutation: {
        checkoutBook: (_: any, args: {bookId: string, personId: string}) => {
            const book = books.find((b) => b.id === args.bookId);
            if (!book) {
                throw new Error("Book not found");
            }

            if (book.isCheckedOut) {
                throw new Error("Book already checked out");
            }

            const person = persons.find((p) => p.id === args.personId);
            if (!person) {
                throw new Error("Person not found");
            }
            book.checkedOutBy = person;
            book.isCheckedOut = true;
            return book;
        },
        returnBook: (_: any, args: {bookId:string}) => {
            const book = books.find((b) => b.id === args.bookId);
            if (!book) {
                throw new Error("Book not found");
            }
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