import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { ApolloServer } from '@apollo/server';
import { PubSub } from 'graphql-subscriptions';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { Modules } from './modules';
import { TokenUtils } from './utils';
import { db } from './db';
import { GraphQLError } from 'graphql';
import { ErrorCodes } from './constants';

const pubsub = new PubSub();

const schema = makeExecutableSchema({
  typeDefs: Modules.map((module) => module.types),
  resolvers: Modules.map((module) => module.resolvers),
});

const app = express();

app.use(express.json());
app.use(cors());

const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            wsServer.close();
          },
        };
      },
    },
  ],
});

await server.start();

app.use(
  '/graphql',
  expressMiddleware(server, {
    context: async ({ req }) => {
      const authorization = req.headers.authorization;

      if (!authorization) {
        return {
          pubsub,
        };
      }

      const userFromToken = TokenUtils.decodeJWT(authorization);

      if (!userFromToken) {
        throw new GraphQLError(ErrorCodes.UNAUTHORIZED);
      }

      const user = await db
        .selectFrom('user_data')
        .selectAll()
        .where('email', '=', userFromToken)
        .executeTakeFirst();

      if (!user) {
        throw new GraphQLError(ErrorCodes.UNAUTHORIZED);
      }

      return {
        pubsub,
        user,
      };
    },
  }),
);

export { httpServer };
