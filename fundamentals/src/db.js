const users = [
  {
    id: 4,
    name: "Tayebwa Maxon",
    email: "maxtayebw@gmail.com",
    age: 45
  },
  {
    id: 5,
    name: "Mucunguzi Colson",
    email: "colsonmucu@gmail.com",
    age: 55
  },
  {
    id: 6,
    name: "Isaiah Chebrot",
    email: "isaiah@gmail.com"
  }
];

const posts = [
  {
    id: 45,
    title: "VS Code Is Actually Powerful",
    body: "Yo, sure Ms is making wonders and miracles",
    published: false,
    author: 4
  },
  {
    id: 46,
    title: "Javascript is King",
    body: "The Internals of JS are amazing",
    published: false,
    author: 5
  },
  {
    id: 47,
    title: "Secret to GraphQL",
    body: "Your Schema feels fine? It probably is!",
    published: true,
    author: 6
  }
];

const comments = [
  {
    id: 1,
    text: "Yo Nigga, that's dope",
    post: 45,
    author: 4
  },
  {
    id: 2,
    text: "Hahahaha",
    post: 46,
    author: 5
  },
  {
    id: 3,
    text: "Am telling you...",
    post: 47,
    author: 6
  },
  {
    id: 4,
    text: "JS is king!, Damn...",
    post: 45,
    author: 5
  }
];

export default { users, comments, posts };
