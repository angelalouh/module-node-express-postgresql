// The sample knexfile.js exports an object with various key-value pairs for different environments.
    // The default knexfile.js comes with development, testing, staging, and production environments.


const path = require("path");

// Requires and loads dotenv into the application code. Dotenv loads the environment variables that you defined in .env into process.env
require("dotenv").config();

// Stores the value of process.env.DATABASE_URL in a variable called DATABASE_URL
const { DATABASE_URL } = process.env;

module.exports = {

  // Each key is set to the object containing database configuration variables for that environment
  development: {
    /* Client value is a required string describing the database library for Knex 
        to connect to. Knex will use the appropriate client adapter. */
    client: 'postgresql',
    /* Connection is set to an object, connection string, or function returning an 
        object containing the credentials and connection URL for the database instance. */
    connection: DATABASE_URL,
    // Telling Knex to store migration files in the migrations folder at src/db/migrations
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },
};
