import express from 'express';
import auth from './auth.js';
import users from './users.js';
import posts from './posts.js';
import tags from './tags.js';
import answers from './answers.js';
import comments from './comments.js';

const router = express.Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/posts', posts);
router.use('/tags', tags);
router.use('/posts/answers', answers);
router.use('/posts/comments', comments);

export default router;
