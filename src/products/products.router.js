const router = require("express").Router({ mergeParams: true });
const controller = require("./products.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);

// regex expression, "([0-9]+)",  ensures the route param, :movieId, consists of just one or more digits
router.route("/:productId([0-9]+)").get(controller.read).all(methodNotAllowed);

module.exports = router;
