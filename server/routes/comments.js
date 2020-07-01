const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const commentsController = require('../controllers/comments');

/** @route      GET /api/posts/comments/:id
 *  @desc       fetch all comments of a post
 *  @access     Private
 */
router.get('/:id', commentsController.getComments);

/** @route      POST /api/posts/comments/:id
 *  @desc       add a comment to a post
 *  @access     Private
 */
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

/** @route      DELETE /api/posts/comments/:id
 *  @desc       delete a comment to a post
 *  @access     Private
 */
router.delete('/:id', auth , commentsController.deleteComment);



module.exports = router;