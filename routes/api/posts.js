const router = require('express').Router();

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const auth = require('../../middleware/auth');
const errorHandler = require('../../middleware/errorHandler');
const validate = require('../../middleware/validate');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', auth(), validate('createPost'), errorHandler(), async (req, res) => {
  try {
    const newPostFields = {
      user: req.user.id,
      text: req.body.text,
    };

    let post = await new Post(newPostFields).save();
    post = await Post.findById(post._id).populate('user', ['name', 'avatar']);

    res.json(post);
  } catch (err) {
    console.error(err);

    res.status(500).send('Internal server error');
  }
});

module.exports = router;