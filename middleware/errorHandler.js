const { validationResult } = require('express-validator');

// @desc: Handles errors from validator middleware
module.exports = () => {
  return (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  }
}