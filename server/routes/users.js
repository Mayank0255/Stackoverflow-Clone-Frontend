import express from 'express';
import validator from 'express-validator';
import checkExistence from '../middleware/checkExistence.js';
import usersController from '../controllers/users.js';

const router = express.Router();
const {check} = validator;

/** @route      GET /api/users
 *  @desc       fetch all the users
 *  @access     Private
 */
router.get('/', usersController.getUsers);

/** @route      GET /api/users/:id
 *  @desc       fetch single user
 *  @access     Private
 */
router.get('/:id', usersController.getUsers);

/** @route      POST /api/users/:id
 *  @desc       register a new user
 *  @access     Private
 */
router.post(
  '/',
  [
    check('username', 'Please include a valid username').isLength({min: 5}),
    check(
      'password',
      'Please enter a password with 5 or more characters'
    ).isLength({min: 5}),
    checkExistence,
  ],
  usersController.register
);

export default router;
