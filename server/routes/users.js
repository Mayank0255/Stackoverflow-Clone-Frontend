const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const usersController = require('../controllers/users');

/** @route      GET /api/users
 *  @desc       fetch all the users
 *  @access     Private
 */
router.get('/', usersController.getAllUsers);

/** @route      GET /api/users/:id
 *  @desc       fetch single user
 *  @access     Private
 */
router.get('/:id', usersController.getSingleUser);

/** @route      POST /api/users/:id
 *  @desc       register a new user
 *  @access     Private
 */
router.post(
    '/',
    [
        check('username', 'Please include a valid username').isLength({min:5}),
        check(
            'password',
            'Please enter a password with 5 or more characters'
        ).isLength({ min: 5 })
    ], usersController.register);

module.exports = router;