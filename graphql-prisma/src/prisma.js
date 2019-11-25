import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466/",
  secret: "heyIamYourNodeClient"
});

export { prisma as default };
// prisma.query
//   .users(null, "{ id comments { id } }")
//   .then(users => console.log(JSON.stringify(users, undefined, 2)))
//   .catch(e => console.log(e));

// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: "Posting from Prisma binding",
//         body: "Zambezi",
//         published: true,
//         author: { connect: { id: "ck3c0g2f300910750r0txqfju" } }
//       }
//     },
//     "{ id title body published author { id name email } }"
//   )
//   .then(post => console.log(JSON.stringify(post, undefined, 2)))
//   .catch(e => console.log(e));

// prisma.mutation
//   .updatePost(
//     {
//       where: {
//         id: "ck3csc0aq001y07507e9m5uf1"
//       },
//       data: {
//         published: false
//       }
//     },
//     "{ id title body published author { id name email } }"
//   )
//   .then(post => console.log(JSON.stringify(post, undefined, 2)))
//   .catch(e => console.log(e));

// prisma.exists.Post({ id: "123abc" }).then(exists => console.log(exists));
// prisma.exists
//   .Post({ id: "ck3csc0aq001y07507e9m5uf1" })
//   .then(exists => console.log(exists));
// const createPostForUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({ id: authorId });

//   if (!userExists) throw new Error("User does not exist");

//   const post = await prisma.mutation.createPost(
//     { data: { ...data, author: { connect: { id: authorId } } } },
//     "{ author { id name email posts { id title published} } }"
//   );

//   return post.author;
// };

// const updatePostForUser = async (postId, data) => {
//   const postExists = await prisma.exists.Post({ id: postId });

//   if (!postExists) throw new Error("Post does not exist");

//   const post = await prisma.mutation.updatePost(
//     { where: { id: postId }, data },
//     "{ author { id name email posts { id title published} } }"
//   );

//   return post.author;
// };
