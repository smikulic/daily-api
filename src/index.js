const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require('@prisma/client');
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");

const prisma = new PrismaClient();

const resolvers = {
  Query,
  Mutation,
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
    };
  },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
