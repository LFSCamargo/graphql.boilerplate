export const HealthResolvers = {
  Query: {
    health() {
      return {
        message: 'Server is up and Running',
      };
    },
  },
};
