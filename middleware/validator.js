const { check } = require('express-validator');
const errorHandler = require('./errorHandler');

module.exports = (method) => {
  switch (method) {
    case 'registerUser': {
      return [
        check('name', 'Name is required')
          .trim()
          .not()
          .isEmpty(),
        check('email', 'Please include valid email')
          .trim()
          .isEmail(),
        check('password', 'Please enter a password with 6 or more characters')
          .trim()
          .isLength({
            min: 6
          }),
        check('password2', "Please ensure that both passwords match")
          .trim()
          .custom((value, {req}) => value === req.body.password),
        errorHandler()
      ]
    }

    case 'loginUser': {
      return [
        check('email', 'Please include valid email')
          .trim()
          .isEmail(),
        check('password', 'Please enter a password')
          .trim()
          .exists(),
        errorHandler()
      ]
    }

    case 'createProfile': {
      return [
        check('status', 'Status is required')
          .trim()
          .not()
          .isEmpty(),
        check('skills', 'Skills is required')
          .trim()
          .not()
          .isEmpty(),
          errorHandler()
      ]
    }

    case 'updateExperience': {
      return [
        check('title', 'Title is required')
          .trim()
          .not()
          .isEmpty(),
        check('company', 'Company is required')
          .trim()
          .not()
          .isEmpty(),
        check('from', 'From date is required')
          .trim()
          .not()
          .isEmpty(),
        errorHandler()
      ]
    }

    case 'updateEducation': {
      return [
        check('school', 'School is required')
          .trim()
          .not()
          .isEmpty(),
        check('degree', 'Degree is required')
          .trim()
          .not()
          .isEmpty(),
        check('fieldofstudy', 'Field of Study is required')
          .trim()
          .not()
          .isEmpty(),
        check('from', 'From date is required')
          .trim()
          .not()
          .isEmpty(),
        errorHandler()
      ]
    }

    case 'createPost': {
      return [
        check('text', 'Text is required')
          .trim()
          .not()
          .isEmpty(),
        errorHandler()
      ]
    }

    case 'createComment': {
      return [
        check('text', 'Text is required')
          .trim()
          .not()
          .isEmpty(),
        errorHandler()
      ]
    }
  }
}