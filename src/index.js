import { createApolloServer } from './util/apollo-server';
import models from './models';
import schema from './schema';
import resolvers from './resolvers';
import { connect } from './util/db';
import logging from './config/logging';

logging(global);

const port = process.env.PORT || 4000;

// Connect to database
connect();

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = createApolloServer(schema, resolvers, models);

// The `listen` method launches a web server.
server.listen(port).then(({ url }) => {
  logger.info(`🚀  Server ready at ${url}`);
});

export default server;
