const router = require('express').Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const validate = require('../../middleware/validate');
const errorHandler = require('../../middleware/errorHandler');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', validate('registerUser'), errorHandler(), async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check for existing user
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
    }

    // Get users gravatar--from email
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });

    // Assign new User object with the given properties
    user = new User({
      name,
      email,
      avatar,
      password
    });

    // Encrypt password & Update User object
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    // Save user to db
    await user.save();

    // Return JWT
    const payload = {
      user: {
        id: user.id,
      }
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: config.get('jwtExpiresIn') },
      (err, token) => {
        if (err) throw err;

        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal server error')
  }
});

module.exports = router;