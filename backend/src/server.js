const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

async function startApolloServer() {
  const app = express();

  // CORS
  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // Apollo Middleware
  server.applyMiddleware({ app });

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startApolloServer().catch((err) => {
  console.error("Error starting Apollo Server:", err);
});
