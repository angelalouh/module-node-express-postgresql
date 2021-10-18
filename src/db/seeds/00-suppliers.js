// Requiring the suppliers seed data and stores it in the suppliers variable
const suppliers = require("../fixtures/suppliers");

exports.seed = function (knex) {
  return knex
    // The knex.raw() method uses the SQL statement RESTART IDENTITY to reset the primary key values
    // Adding CASCADE ensures any references to the entries in the suppliers table are deleted as well when the supplier entries are deleted
    .raw("TRUNCATE TABLE suppliers RESTART IDENTITY CASCADE")
    .then(function () {
      // This line will only get executed after the preceding knex.raw() function is complete
      return knex("suppliers").insert(suppliers);
    });
};
