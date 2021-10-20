/* The asyncErrorBoundary() fxn takes two parameters:
        delegate - an async/await handler or middleware function. This function will be called by the asyncErrorBoundary
        defaultStatus - an optional parameter that allows you to override the status code returned when delegate throws an error
    asyncErrorBoundary() returns an Express handler or middleware fxn, which is eventually called by Express in place of the delegate fxn
*/
function asyncErrorBoundary(delegate, defaultStatus) {
  return (req, res, next) => {
    /* Promise.resolve().then(() => delegate(req, res, next)) makes sure the delegate fxn is called in a promise chain
        and the value returned is guaranteed to have a catch() method, even if delegate isn't an async fxn */
    Promise.resolve()
      .then(() => delegate(req, res, next))
      // catch() will default error to {} if error is undefined, which will make sure destructuring in the next line doesn't fail
      .catch((error = {}) => {
        // Error obj is destructured to status and message variables
        // By defaulting message to error, error can be a String or Error object
        const { status = defaultStatus, message = error } = error;
        next({
          status,
          message,
        });
      });
  };
}

module.exports = asyncErrorBoundary;
