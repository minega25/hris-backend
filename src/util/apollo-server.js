import jwt from 'jsonwebtoken';
import { ApolloServer, AuthenticationError } from 'apollo-server';

/**
 * Checks if client is authenticated by checking authorization key from req headers
 *
 * @param {obj} req
 */

// const checkAuthorization = (token) => {
//   try {
//     return jwt.verify(token, process.env.SECRET_KEY);
//   } catch ({ message }) {
//     logger.error(message);
//     return null;
//   }
// };

// const subscriptions = {
//   onConnect: async (connectionParams, webSocket) => {
//     // Check if user is authenticated
//     if (connectionParams.authorization) {
//       const user = await checkAuthorization(connectionParams.authorization);
//       // Add authUser to socket's context, so we have access to it, in onDisconnect method
//       return {
//         authUser: user,
//       };
//     }
//   },
//   onDisconnect: async (webSocket, context) => {
//     // Get socket's context
//     const c = await context.initPromise;
//     // more stuffs to be added as app grow
//   },
// };

/**
 * Creates an Apollo server and identifies if user is authenticated or not
 *
 * @param {obj} schema GraphQL Schema
 * @param {array} resolvers GraphQL Resolvers
 * @param {obj} models Mongoose Models
 */
export const createApolloServer = (typeDefs, resolvers, models) =>
  new ApolloServer({
    typeDefs,
    resolvers,
    // context: ({ req }) => {
    //   const token = req.headers.authorization || '';

    //   // try to retrieve a user with the token
    //   const user = getUser(token);

    //   // add the user to the context
    //   return { user };
    // },
    // subscriptions,
    introspection: true,
    playground: true,
  });
