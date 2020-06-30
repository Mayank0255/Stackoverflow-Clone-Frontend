const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const postsController = require('../controllers/posts');

// @route    /api/posts
// @access   Private
router.get('/', postsController.getPosts);

//TOP POSTS
router.get('/top', postsController.getTopPosts);

//NEWEST POSTS BASED OF A SPECIFIC TAG
router.get('/tag/:tagname', postsController.getTagPosts);

//GET SINGLE POST
router.get('/:id',postsController.getSinglePost);

router.post(
    '/',
    [
        auth,
        [
            check('title', 'Enter a title with minimum 15 characters').isLength({min:15}),
            check('body','Enter a body with minimum 30 characters').isLength({min:30})
        ],
    ], postsController.addPost);

router.delete('/:id', auth , postsController.deletePost);

module.exports = router;