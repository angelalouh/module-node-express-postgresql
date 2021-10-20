const knex = require("../db/connection");

function listTotalWeightByProduct() {
  return (
    knex("products")
      // This query selects 3 columns
      .select(
        "product_sku",
        "product_title",
        // This is the 3rd column, which is the sum of multiplying the values from 2 columns.
        knex.raw(
          "sum(product_weight_in_lbs * product_quantity_in_stock) as total_weight_in_lbs"
        )
      )
      .groupBy("product_title", "product_sku")
  );
}

function listPriceSummary() {
  return knex("products")
    .select("supplier_id")
    .min("product_price")
    .max("product_price")
    .avg("product_price")
    .groupBy("supplier_id");
}

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

function read(product_id) {
  // Will return a specific product, including all of its related category information
  return knex("products as p")
    .join("products_categories as pc", "p.product_id", "pc.product_id")
    .join("categories as c", "pc.category_id", "c.category_id")
    .select("p.*", "c.*")
    .where({ "p.product_id": product_id })
    .first();

  /* This code creates a Knex query that selects all columns from the products table
    where the product_id column matches the argument passed to the read() fxn. The first() 
    method returns the first row in the table as an object.

  return knex("products").select("*").where({ product_id }).first();

  */
}

module.exports = {
  list,
  read,
  listOutOfStockCount,
  listPriceSummary,
  listTotalWeightByProduct,
};
