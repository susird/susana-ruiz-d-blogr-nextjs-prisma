const { ApolloServer } = require('apollo-server');
const { PrismaClient }= require('@prisma/client');

const prisma = new PrismaClient();
const port = process.env.PORT || 8080
const typeDefs = `
  type Post {
    title: String
    content: String
    author: User
  }
  type User {
    email: String!
    name: String
  }
  type Query {
    allUsers: [User!]!
    allPosts: [Post!]!
  }`;
const resolvers = {
  Query: {
    allUsers: () => {
      return prisma.user.findMany();
    },
    allPosts: () => {
      return prisma.post.findMany();
    }
  }
};

const server = new ApolloServer({ resolvers, typeDefs });
server.listen({port});