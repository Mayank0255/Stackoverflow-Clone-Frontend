const jwt = require('jsonwebtoken');
const config = require('config');
const helperFunction = require('../helpers/helperFunction');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res
            .status(401)
            .json(helperFunction.responseHandler(false, 401, 'Sign-in required', null));
    }

    // Verify token
    try {
        jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
            if (error) {
                return res
                    .status(400)
                    .json(helperFunction.responseHandler(false, 400, 'Try again', null));
            } else {
                req.user = decoded.user;
                next();
            }
        });
    } catch (err) {
        console.error('error: ' + err);
        return res
            .status(500)
            .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
    }
};