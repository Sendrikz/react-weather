import { config } from "dotenv";
import { ApolloServer } from "apollo-server";
import schema from "./schema/index.js";
config();

const server = new ApolloServer({
  schema: schema,
  cors: { credentials: true, origin: "http://localhost:3000" },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
