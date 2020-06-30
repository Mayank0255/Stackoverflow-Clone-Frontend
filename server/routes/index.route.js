const auth = require('./api/auth');
const users = require('./api/users');
const posts = require('./api/posts');
const tags = require('./api/tags');
const answers = require('./api/answers');
const comments = require('./api/comments');

const express = require('express');
const router = express.Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/posts', posts);
router.use('/tags', tags);
router.use('/posts/answers', answers);
router.use('/posts/comments', comments);

module.exports = router;