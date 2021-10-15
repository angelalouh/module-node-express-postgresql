// The exports.up and exports.down functions should always return a promise.

/* Within the exports.up function you can specify the Knex methods for making the 
    desired database changes, such as creating tables, adding or removing a column 
    from a table, changing indexes, etc. */
exports.up = function (knex) {
  return knex.schema.createTable("suppliers", (table) => {
    table.increments("supplier_id").primary(); // sets supplier_id as the primary key
    table.string("supplier_name");
    table.string("supplier_address_line_1");
    table.string("supplier_address_line_2");
    table.string("supplier_city");
    table.string("supplier_state");
    table.string("supplier_zip");
    table.string("supplier_phone");
    table.string("supplier_email");
    table.text("supplier_notes");
    table.string("supplier_type_of_goods");
    /* Adds created_at and updated_at columns; passing true as the first argument sets 
    the columns to be a timestamp type while passing true as the second argument sets 
    those columns to be non-nullable and to use the current timestamp by default */
    table.timestamps(true, true);
  });
};

/* The exports.down function allows you to quickly undo a migration, if needed. It 
    does the opposite of exports.up. Ex. If exports.up created a table, then exports.down
    will remove that table. */
exports.down = function (knex) {
  // When you undo a migration, exports.down will get invoked, which will call the dropTable method to drop the suppliers table.
  return knex.schema.dropTable("suppliers");
};
