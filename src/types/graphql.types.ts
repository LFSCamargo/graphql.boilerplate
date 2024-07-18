import { type PubSub } from 'graphql-subscriptions';

export type GraphQLContext = {
  user?: {
    id: number;
    name: string;
    email: string;
    password: string;
    picture: string | null;
    created_at: Date;
  } | null;
  pubsub: PubSub;
};
