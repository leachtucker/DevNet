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

    case 'loginUser': {
      return [
        check('email', 'Please include valid email')
          .isEmail(),
        check('password', 'Please enter a password')
          .exists(),
      ]
    }

    case 'createProfile': {
      return [
        check('status', 'Status is required')
          .not()
          .isEmpty(),
        check('skills', 'Skills is required')
          .not()
          .isEmpty(),
      ]
    }

    case 'updateExperience': {
      return [
        check('title', 'Title is required')
          .not()
          .isEmpty(),
        check('company', 'Company is required')
          .not()
          .isEmpty(),
        check('from', 'From date  is required')
          .not()
          .isEmpty(),
      ]
    }
  }
}