const knex = require("../db/connection");

function listOutOfStockCount() {
    return knex("products")
        .select("product_quantity_in_stock as out_of_stock")
        .count("product_id")
        .where({ product_quantity_in_stock: 0 })
        .groupBy("out_of_stock");
}

function list() {
    return knex("products").select("*");
}

/* This read() fxn creates a Knex query that selects all columns from the products table
    where the product_id column matches the argument passed to the read() fxn. The first() 
    method returns the first row in the table as an object. */
function read(product_id) {
    return knex("products").select("*").where({ product_id }).first();
}

module.exports = {
    list,
    read,
    listOutOfStockCount,
};