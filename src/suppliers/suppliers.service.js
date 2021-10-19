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

function read(supplier_id) {
    return knex("suppliers").select("*").where({ supplier_id }).first();
}

function update(updatedSupplier) {
    return knex("suppliers")
        .select("*")
        .where({ supplier_id: updatedSupplier.supplier_id })
        // update() accepts an obj containing the data for updating the existing supplier and it is also passed a second argument
        // If a returning array is passed as the second argument, it resolves the promise with an array of all the updated rows with specified columns
        // You can also pass "*" as the second arg to return all of the columns of the updated rows
        .update(updatedSupplier, "*")
        .then((updatedRecords) => updatedRecords[0]);
}

// Deleting a supplier based on ID
function destroy(supplier_id) {
    // Unlike update() and insert(), del() does not accept any arguments
    return knex("suppliers").where({ supplier_id }).del();
}

module.exports = {
    create,
    read,
    update,
    destroy,
};