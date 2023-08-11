const { HttpError } = require("../helpers");

const validateBody = (scheme) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      next(HttpError(400, "missing fields"));
    } else {
      const { error } = scheme.validate(req.body);
      if (error) {
        next(
          HttpError(400, `missing required ${error.details[0].path[0]} field`)
        );
      } else {
        next();
      }
    }
  };
  return func;
};

module.exports = validateBody;
