// Requiring the service object created in categories.service.js
const categoriesService = require("./categories.service");

async function list(req, res, next) {
  categoriesService
    // Accessing the list method to perform CRUD operations on a table
    .list()
    // Chaining then() executes the Knex query
    .then((data) => res.json({ data }))
    // Chaining catch(next) onto the promise will call next() passing in the error
    .catch(next);
}

module.exports = {
  list,
};
