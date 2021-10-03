const { ApolloServer } = require('apollo-server');
const { PrismaClient }= require('@prisma/client');

const prisma = new PrismaClient();
const port = process.env.PORT || 8080
const typeDefs = `
  type User {
    email: String!
    name: String
  }
  type Query {
    allUsers: [User!]!
  }
`;
const resolvers = {
  Query: {
    allUsers: () => {
      return prisma.user.findMany();
    }
  }
};

const server = new ApolloServer({ resolvers, typeDefs });
server.listen({port});