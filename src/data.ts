
export interface Person {
    id: string;
    firstName: string;
    lastName: string
    emailAddress: string;
    phoneNumber: string;
}
export interface Book {
    id: string;
    title: string;
    author: string;
    isCheckedOut: boolean;
    checkedOutBy?: Person
}
export const books: Book[] = [
    {
      id: "1",
      title: 'The Awakening',
      author: 'Kate Chopin',
      isCheckedOut: false,
      checkedOutBy: null,
      
    },
    {
      id: "2",
      title: 'City of Glass',
      author: 'Paul Auster',
      isCheckedOut: false,
      checkedOutBy: null
    },
  ];

export const persons: Person[] = [
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

