import express from 'express';
import validator from 'express-validator';
import auth from '../middleware/auth.js';
import authController from '../controllers/auth.js';

const router = express.Router();
const {check} = validator;

/** @route      GET /api/auth
 *  @desc       fetch logged in user details
 *  @access     Private
 */
router.get('/', auth, authController.loadUser);

/** @route      POST /api/auth
 *  @desc       log in user
 *  @access     Private
 */
router.post(
  '/',
  [
    check('username', 'Please include a valid username').isLength({min: 5}),
    check('password', 'Password is required').not().isEmpty(),
  ],
  authController.login
);

export default router;
