import { GraphQLError } from 'graphql';
import { db } from '../../db';
import { PasswordUtils, TokenUtils } from '../../utils';
import { ErrorCodes } from '../../constants';
import { GraphQLContext } from '../../types/graphql.types';

type InputTypes = {
  login: { input: { email: string; password: string } };
  signUp: { input: { email: string; password: string; name: string } };
  updateUser: { input: { email?: string; name?: string; picture?: string } };
};

export const UserResolvers = {
  Query: {
    me: async (_: any, __: any, { user }: GraphQLContext) => {
      if (!user) {
        throw new GraphQLError(ErrorCodes.UNAUTHORIZED);
      }
      return user;
    },
  },
  Mutation: {
    signUp: async (_: any, { input }: InputTypes['signUp']) => {
      const user = await db
        .selectFrom('user_data')
        .selectAll()
        .where('email', '=', input.email)
        .executeTakeFirst();

      if (user) {
        throw new GraphQLError(ErrorCodes.USER_ALREADY_EXISTS);
      }

      const newUser = await db
        .insertInto('user_data')
        .values({
          email: input.email,
          password: PasswordUtils.encodePassword(input.password),
          name: input.name,
          created_at: new Date().toISOString(),
        })
        .returningAll()
        .executeTakeFirst();

      return {
        token: TokenUtils.encodeJWT(newUser.email),
        user: newUser,
      };
    },
    login: async (_: any, { input }: InputTypes['login']) => {
      const user = await db
        .selectFrom('user_data')
        .selectAll()
        .where('email', '=', input.email)
        .executeTakeFirst();

      if (!user) {
        throw new GraphQLError(ErrorCodes.INVALID_EMAIL_OR_PASSWORD);
      }

      const isPasswordValid = PasswordUtils.comparePassword(
        input.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new GraphQLError(ErrorCodes.INVALID_EMAIL_OR_PASSWORD);
      }

      return {
        token: TokenUtils.encodeJWT(user.email),
        user,
      };
    },
    updateUser: async (
      _: any,
      { input }: InputTypes['updateUser'],
      { user, pubsub }: GraphQLContext,
    ) => {
      if (!user) {
        throw new GraphQLError(ErrorCodes.UNAUTHORIZED);
      }

      const updatedUser = await db
        .updateTable('user_data')
        .set({
          email: input.email || user.email,
          name: input.name || user.name,
          picture: input.picture || user.picture,
        })
        .returningAll()
        .executeTakeFirst();

      return updatedUser;
    },
  },
};
