// Requiring the knex instance initialized in the path in quotes
const knex = require("../db/connection");

// Declares a function called list(), which builds a query that selects all columns from the categories table
function list() {
    return knex("categories").select("*");
}

module.exports = {
    list,
};