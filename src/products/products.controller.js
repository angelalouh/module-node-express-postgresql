const productsService = require("./products.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Validation middleware function:
async function productExists(req, res, next) {
  const product = await productsService.read(req.params.productId);
  if (product) {
    res.locals.product = product;
    return next();
  }
  next({ status: 404, message: `Product cannot be found.` });
}


/* Code using then() and catch()
function productExists(req, res, next) {
  productsService
    .read(req.params.productId)
    .then((product) => {
      if (product) {
        res.locals.product = product;
        return next();
      }
      next({
        status: 404,
        message: 'Product cannot be found.',
      })
    })
    .catch(next);
}
*/

function read(req, res, next) {
  const { product: data } = res.locals;
  res.json({ data });
}

async function list(req, res, next) {
  const data = await productsService.list();
  res.json({ data });

  /* Code using then() and catch()
  productsService
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
  */
}

async function listOutOfStockCount(req, res, next) {
  res.json({ data: await productsService.listOutOfStockCount() });
}

module.exports = {
  read: [asyncErrorBoundary(productExists), read],
  list: asyncErrorBoundary(list),
  listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
};
