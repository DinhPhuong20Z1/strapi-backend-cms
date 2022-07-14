module.exports = () => ({
  graphql: {
    enabled: true,
    config: {
      playgroundAlways: false,
      defaultLimit: 20,
      maxLimit: 100,
      apolloServer: {
        tracing: true,
      },
    },
  },
});
