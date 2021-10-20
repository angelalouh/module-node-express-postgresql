const lodash = require("lodash");

/* This function accepts a configuration parameter, which is an obj where the key specifies
    the original property name and the value specifies the new property name. 
    The mapProperties() fxn returns a new fxn that can be used over and over to modify multiple data objs.*/
function mapProperties(configuration) {
  return (data) => {
    if (data) {
      return Object.entries(data).reduce((acc, [key, value]) => {
        return lodash.set(acc, configuration[key] || key, value);
      }, {});
    }
    return data;
  };
}

module.exports = mapProperties;
