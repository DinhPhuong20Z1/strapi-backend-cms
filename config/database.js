const path = require("path");

module.exports = ({ env }) => ({
  connection: {
    client: env("DATABASE_CLIENT", "sqlite"),
    connection: {
      host: env("DATABASE_HOST", "localhost"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "bank"),
      user: env("DATABASE_USERNAME", "postgres"),
      password: env("DATABASE_PASSWORD", "0000"),
      schema: env("DATABASE_SCHEMA", "public"), // Not required
      filename: path.join(
        __dirname,
        "..",
        env("DATABASE_FILENAME", ".tmp/data.db")
      ),
    },
    debug: false,
    useNullAsDefault: true,
  },
});
