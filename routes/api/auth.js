const router = require('express').Router();
const authMiddleware = require('../../middleware/auth');
const User = require('../../models/User');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', authMiddleware(), async (req, res) => {
  try {
    console.log(req.user);
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err);

    res.status(500).send('Server error');
  }
});

module.exports = router;