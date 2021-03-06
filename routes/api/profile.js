const router = require('express').Router();
const axios = require('axios');
const config = require('config');

const auth = require('../../middleware/auth');
const validator = require('../../middleware/validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth(), async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(404).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

// @route   POST api/profile/
// @desc    Create or update user profile
// @access  Private
router.post('/', auth(), validator('createProfile'), async (req, res) => {
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body;

  // Build profile obj
  const profileFields = {};

  profileFields.user = req.user.id;
  profileFields.company = company || '';
  profileFields.website = website || '';
  profileFields.location = location || '';
  profileFields.bio = bio || '';
  if (status) profileFields.status = status;
  profileFields.githubusername = githubusername || '';
  if (skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim());
  }

  // Build social obj
  profileFields.social = {};

  profileFields.social.youtube = youtube || '';
  profileFields.social.facebook = facebook || '';
  profileFields.social.twitter = twitter || '';
  profileFields.social.instagram = instagram || '';
  profileFields.social.linkedin = linkedin || '';

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update profile
      profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });

      return res.json(profile);
    }

    // Create profile
    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

// @route   GET api/profile/
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    res.json(profiles);
  } catch (err) {
    console.error(err);

    res.status(500).send('Internal server error');
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const profile = await Profile.findOne({ user: user_id }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err);

    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: "Profile not found" });
    }

    res.status(500).send('Internal server error');
  }
});

// @route   DELETE api/profile/
// @desc    Delete profile, user, posts, and comments
// @access  Private
router.delete('/', auth(), async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id });

    // Delete comments/likes associated with user's ID from all posts
    // This is a costly operation and could be avoided by setting likes/comments in their own respective collections
    const posts = await Post.find();

    if (posts) {
      posts.forEach(async post => {
        post.likes = post.likes.filter(like => (like.user._id.toHexString() !== req.user.id));
        post.comments = post.comments.filter(comment => (comment.user._id.toHexString() !== req.user.id));
        post.markModified('likes');
        post.markModified('comments');
        await post.save();
      })
    }

    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User, profile, posts, and comments removed" });
  } catch (err) {
    console.error(err);

    res.status(500).send('Internal server error');
  }
});

// @route   PUT api/profile/experience
// @desc    Adds profile experience
// @access  Private
router.put('/experience', auth(), validator('updateExperience'), async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    const profile = await Profile.findOne({ user: req.user.id });

    // Check for profile--if not exist
    if (!profile) {
      return res.status(400).json({ msg: "No profile exists for this user" });
    }

    profile.experience.unshift(newExperience);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err);

    res.status(500).send('Internal server error');
  }
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    Remove experience from profile
// @access  Private
router.delete('/experience/:exp_id', auth(), async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(400).json({ msg: "No profile exists for this user" });
    }

    // Find index & splice--must splice rather than pop in order to keep original order
    const expIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

    if (expIndex == -1) {
      return res.status(400).json({ msg: "No experience with this ID" });
    }

    profile.experience.splice(expIndex, 1);

    // Save modified profile
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

// @route   PUT api/profile/education
// @desc    Adds profile education
// @access  Private
router.put('/education', auth(), validator('updateEducation'), async (req, res) => {
  try {
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    const profile = await Profile.findOne({ user: req.user.id });

    // Check for profile--if not exist
    if (!profile) {
      return res.status(400).json({ msg: "No profile exists for this user" });
    }

    // Add new education obj to beginning of education array
    profile.education.unshift(newEducation);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err);

    res.status(500).send('Internal server error');
  }
});

// @route   DELETE api/profile/education/:exp_id
// @desc    Remove education from profile
// @access  Private
router.delete('/education/:edu_id', auth(), async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(400).json({ msg: "No profile exists for this user" });
    }

    // Find index & splice--must splice rather than pop in order to keep original order
    const eduIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

    if (eduIndex == -1) {
      return res.status(400).json({ msg: "No education with this ID" });
    }

    profile.education.splice(eduIndex, 1);

    // Save modified profile
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err);

    res.status(500).send('Internal server error');
  }
});

// @route   GET api/profile/github/:username
// @desc    Get user repos from github
// @access  Public
router.get('/github/:username', async (req, res) => {
  try {
    const reqURL = `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`;

    const client_id = config.get('githubClientID');
    const client_secret = config.get('githubSecret');

    const response = await axios.get(reqURL, {auth: {client_id, client_secret}});

    res.json(response.data);
  } catch (err) {
    console.error(err);

    if (err.response && err.response.status == 404) {
      return res.status(404).json({ msg: "No github profile found with that username" });
    }

    res.status(500).send('Internal server error');
  }
});

module.exports = router;