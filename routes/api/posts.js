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

// @route   GET api/posts
// @desc    Get all posts--from most recent to oldest
// @access  Private
router.get('/', auth(), async (req, res) => {
  try {
    const posts = await Post.find().populate('user', ['name', 'avatar']).sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err);

    res.status(500).send('Internal server error');
  }
});

// @route   GET api/posts/:post_id
// @desc    Get post by ID
// @access  Private
router.get('/:post_id', auth(), async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id).populate('user', ['name', 'avatar']);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err);

    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: "Invalid post ID" });
    }

    res.status(500).send('Internal server error');
  }
});

// @route   Delete api/posts/:post_id
// @desc    Delete post by its ID
// @access  Private
router.delete('/:post_id', auth(), async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // Check if post exists
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check that the post belongs to the user
    if (post.user != req.user.id) {
      return res.status(401).json({ msg: "Cannot delete a post that is not yours" });
    }

    await Post.findOneAndRemove({ _id: req.params.post_id });

    res.json({ msg: "Post deleted!" });
  } catch (err) {
    console.error(err);

    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: "Invalid post ID" });
    }

    res.status(500).send('Internal server error');
  }
});

module.exports = router;