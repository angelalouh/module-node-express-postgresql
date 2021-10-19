/* This code determines the current environment where the application code is running and 
stores the value in the env variable. If process.env.NODE_ENV is not defined, then set the value to "development". */
const env = process.env.NODE_ENV || "development";

// Requires the database configuration object from the knexfile.js for the current environment and stores it in the config variable.
    // In this case, since env is set to "development", config is set to the development config obj from knexfile.js
const config = require("../../knexfile")[env];

// Initializes a Knex instance by calling the knex module, passing in config as an argument.
const knex = require("knex")(config);

// Exports the Knex instance so that other files can require it.
module.exports = knex;