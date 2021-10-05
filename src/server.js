const { ApolloServer } = require('apollo-server');
const { PrismaClient }= require('@prisma/client');

const prisma = new PrismaClient();
const port = process.env.PORT || 8080
const typeDefs = `
  type Post {
    title: String
    content: String
    published: Boolean
    authorId: Int
    author: User
  }
  type User {
    email: String!
    name: String
  }
  type Feed {
    id: Int
    title: String
    content: String
    published: Boolean
    authorId: Int
    author: User
  }
  type Query {
    allUsers: [User!]!
    allPosts: [Post!]!
    feed: [Feed!]!
  }`;
const resolvers = {
  Query: {
    allUsers: () => {
      return prisma.user.findMany();
    },
    allPosts: () => {
      return prisma.post.findMany();
    },
    feed: () =>{ 
      return prisma.post.findMany({
        where: { published: true },
        include: {
          author: {
            select: { name: true, email: true },
          },
        },
      });
    }
  }
};

const server = new ApolloServer({ resolvers, typeDefs });
server.listen({port}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
