const { check } = require('express-validator');

module.exports = (method) => {
  switch (method) {
    case 'registerUser': {
      return [
        check('name', 'Name is required')
          .not()
          .isEmpty(),
        check('email', 'Please include valid email')
          .isEmail(),
        check('password', 'Please enter a password with 6 or more characters')
          .isLength({
            min: 6
          })
      ]
    }
  }
}