export const auth = {
  USERNAME: "admin",
  PASSWORD: "123456",
  FAKE_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTI2LCJpYXQiOjE2Njg0MTgxNDEsImV4cCI6MTY3MTAxMDE0MX0.vkDT5D48EYSVJTTWFYAmaJUnHnTzVIyDKv_qnWYaUJU",
};

let ListBooks = [
  {
    userId: 1,
    userName: "James Moba",
    age: 21,
    email: "Jame@gmail.com",
    password: "123456",
    notes: [
      {
        ID: 1,
        content: "music",
      },
    ],
  },
  {
    userId: 2,
    userName: "Joe West",
    age: 31,
    email: "a@gmail.com",
    password: "123456",
    notes: [
      {
        ID: 1,
        content: "music",
      },
      {
        ID: 2,
        content: "game",
      },
    ],
  },
  {
    userId: 3,
    userName: "Barry Allen",
    age: 26,
    email: "Barry@gmail.com",
    password: "123456",
    notes: [],
  },
];
export default ListBooks;
