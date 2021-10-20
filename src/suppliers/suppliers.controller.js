const suppliersService = require("./suppliers.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Validation middleware:
const VALID_PROPERTIES = [
  "supplier_name",
  "supplier_address_line_1",
  "supplier_address_line_2",
  "supplier_city",
  "supplier_state",
  "supplier_zip",
  "supplier_phone",
  "supplier_email",
  "supplier_notes",
  "supplier_type_of_goods",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

// Using hasProperties() to define a hasRequiredProperties() middleware function
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("supplier_name", "supplier_email");

// Validation middleware:
async function supplierExists(req, res, next) {
  const supplier = await suppliersService.read(req.params.supplierId);
  if (supplier) {
    res.locals.supplier = supplier;
    return next();
  }
  next({ status: 404, message: `Supplier cannot be found.` });
}

/* Code using then() and catch()
function supplierExists(req, res, next) {
  suppliersService
    .read(req.params.supplierId)
    // Chaining then() to suppliersService.read() will execute the Knex query
    .then((supplier) => {
      // If the supplier exists, it is stored in res.locals.supplier
      if (supplier) {
        res.locals.supplier = supplier;
        return next();
      }
      // If supplier doesn't exist, next() is called with an error obj
      next({ status: 404, message: `Supplier cannot be found.` });
    })
    .catch(next);
}
*/

async function create(req, res, next) {
  const data = await suppliersService.create(req.body.data);
  res.status(201).json({ data });
  /* Code using then() and catch()
  suppliersService
    // The req.body.data argument references the obj containing the supplier information
    .create(req.body.data)
    // Chaining then() to suppliersService.create() executes the Knex query
    // If the promise resolves successfully, the server responds with a 201 status code and the newly created supplier
    .then((data) => res.status(201).json({ data }))
    .catch(next);
  */
}

async function update(req, res, next) {
  const updatedSupplier = {
    ...req.body.data,
    /* supplier_id is set to existing supplier_id via res.locals.supplier to prevent the update 
    from accidentally, or intentionally, changing the supplier_id during an update */
    supplier_id: res.locals.supplier.supplier_id,
  };
  const data = await suppliersService.update(updatedSupplier);
  res.json({ data });

  /* Code using then() and catch()
  suppliersService
    .update(updatedSupplier)
    .then((data) => res.json({ data }))
    .catch(next);
  */
}

async function destroy(req, res, next) {
  const { supplier } = res.locals;
  await suppliersService.delete(supplier.supplier_id);
  res.sendStatus(204);
  /* Code using then() and catch()
  suppliersService
    .delete(res.locals.supplier.supplier_id)
    .then(() => res.sendStatus(204))
    .catch(next);
  */
}

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(supplierExists),
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(supplierExists), asyncErrorBoundary(destroy)],
};
