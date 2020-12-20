const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("../prisma/generated/prisma-client");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");

const resolvers = {
  Query,
  Mutation,
};

// const authenticate = async (resolve, root, args, context, info) => {
//   let token;
//   console.log('auth!!')
//   try {
//     token = jwt.verify(context.request.get("Authorization"), "secret");
//   } catch (e) {
//     console.log('AH!')
//     // return new AuthenticationError("Not authorised");
//   }
//   const result = await resolve(root, args, context, info);
//   return result;
// };

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
