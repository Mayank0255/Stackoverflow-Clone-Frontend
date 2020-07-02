const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const helperFunction = require('../helpers/helperFunction')
const { validationResult } = require('express-validator');

const loadUser = (req,res) => {
    try{
        let user;
        connection.query(`Select id,username,created_at FROM users WHERE id = '${req.user.id}';`,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res
                        .status(err.statusCode)
                        .json(helperFunction.responseHandler(false, err.statusCode, err.message, null));
                }
                user = results[0];
                return res.json(helperFunction.responseHandler(true, 200, 'success', user));
            });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
    }
};

const login = (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(helperFunction.responseHandler(false, 400, errors.array()[0].msg, null));
    }
    const { username,password } = req.body;

    try{
        let user;
        connection.query(`SELECT * FROM users WHERE username = '${username}';`,async (err, results) => {
            if (err) {
                return res
                    .status(err.statusCode)
                    .json(helperFunction.responseHandler(false, err.statusCode, err.message, null));
            }
            if (!results[0]){
                return res
                    .status(404)
                    .json(helperFunction.responseHandler(false, 404, 'User does not exists', null));
            } else {
                user = results[0];

                const isMatch = await bcrypt.compare(password, user.password);

                if(!isMatch){
                    return res
                        .status(400)
                        .json(helperFunction.responseHandler(false, 400, 'Incorrect password', null));
                } else {
                    const payload = {
                        user: {
                            id: user.id
                        }
                    };

                    jwt.sign(
                        payload,
                        config.get('jwtSecret'),
                        { expiresIn: 3600000 },
                        (err, token) => {
                            if (err) throw err;
                            return res
                                .status(200)
                                .json(helperFunction.responseHandler(true, 200, 'User logged in', {'token': token}));
                        });
                }
            }
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(helperFunction.responseHandler(true, 500, 'Server Error', null));
    }
};

module.exports = authController = {
    loadUser,
    login
};