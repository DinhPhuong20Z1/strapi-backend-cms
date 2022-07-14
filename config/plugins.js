module.exports = () => ({
  graphql: {
    enabled: false,
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
