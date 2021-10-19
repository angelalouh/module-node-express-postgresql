const knex = require("../db/connection");

function create(supplier) {
    return knex("suppliers")
        // Inserting a new supplier row into the suppliers table
        .insert(supplier)
        // Returning all columns from the newly inserted row
        .returning("*")
        // The .insert() method of Knex can be used to insert more than one record, so it returns an array of the records inserted.
        // In this case, we're only inserting one supplier, so we chain then() onto the query to return only one inserted record.
        .then((createdRecords) => createdRecords[0]);
}

module.exports = {
    create,
};