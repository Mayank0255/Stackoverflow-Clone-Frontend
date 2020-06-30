const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const commentsController = require('../controllers/comments');

// @route    /api/posts/comments
// @access   Private

//comments of a particular post
router.get('/:id', commentsController.getComments);

//add comment to post
router.post(
    '/:id',
    [
        auth,
        [
            check('body','body is required')
                .not()
                .isEmpty()
        ]
    ], commentsController.addComment);

//DELETE ROUTE
router.delete('/:id', auth , commentsController.deleteComment);



module.exports = router;