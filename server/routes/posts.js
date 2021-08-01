import express from 'express';
import validator from 'express-validator';
import auth from '../middleware/auth.js';
import checkOwnership from '../middleware/checkOwnership.js';
import postsController from '../controllers/posts.js';

const router = express.Router();
const {check} = validator;

/** @route      GET /api/posts
 *  @desc       fetch all posts
 *  @access     Private
 */
router.get('/', postsController.getPosts);

/** @route      GET /api/posts/top
 *  @desc       fetch all posts sorted by maximum interactivity
 *  @access     Private
 */
router.get('/top', postsController.getPosts);

/** @route      GET /api/posts/tag/:tagname
 *  @desc       fetch all posts of a specific tag
 *  @access     Private
 */
router.get('/tag/:tagname', postsController.getPosts);

/** @route      GET /api/posts/:id
 *  @desc       fetch a single post
 *  @access     Private
 */
router.get('/:id', postsController.getSinglePost);

/** @route      POST /api/posts/
 *  @desc       add a post
 *  @access     Private
 */
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Enter a title with minimum 15 characters').isLength({
        min: 15,
      }),
      check('body', 'Enter a body with minimum 30 characters').isLength({
        min: 30,
      }),
    ],
  ],
  postsController.addPost
);

/** @route      DELETE /api/posts/:id
 *  @desc       delete a post
 *  @access     Private
 */
router.delete('/:id', [auth, checkOwnership], postsController.deletePost);

export default router;
