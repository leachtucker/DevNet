const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../../middleware/auth');
const validator = require('../../middleware/validator');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Returns the user's info if authenticated
// @access  Public
router.get('/', auth(), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: "No user" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);

    res.status(500).send('Server error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user & Return token
// @access  Public
router.post('/', validator('loginUser'), async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for existing user
    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Check for password match
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

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