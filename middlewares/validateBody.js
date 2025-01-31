const { HttpError } = require("../helpers");

const validateBody = (scheme) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      next(HttpError(400, "missing fields"));
    } else {
      const { error } = scheme.validate(req.body);
      if (error) {
        next(HttpError(400, error.message));
      } else {
        next();
      }
    }
  };
  return func;
};

module.exports = validateBody;
