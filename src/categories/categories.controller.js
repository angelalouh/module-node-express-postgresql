// Requiring the service object created in categories.service.js
const categoriesService = require("./categories.service");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  // categoriesService.list() executes a Knex query, which is an async operation
  // Using await forces the execution of the code to pause on that line until that async operation is finished
  const data = await categoriesService.list();
  res.json({ data });

  /* Code using then() and catch()
  categoriesService
    // Accessing the list method to perform CRUD operations on a table
    .list()
    // Chaining then() executes the Knex query
    .then((data) => res.json({ data }))
    // Chaining catch(next) onto the promise will call next() passing in the error
    .catch(next);
  */
}

module.exports = {
  // Making use of the asyncErrorBoundary by wrapping the async fxn, list(), in it
  list: asyncErrorBoundary(list),
};
