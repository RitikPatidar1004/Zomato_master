const joi = require("joi");

module.exports = () => {
  const Schema = joi.object({
    city: joi().string().required(),
  });

  return Schema.validateAsync(restaurantObject);
};

module.exports = () => {
  const Schema = joi.object({
    searchString: joi.string().required(),
  });

  return Schema.validateAsync(restaurantObject);
};
