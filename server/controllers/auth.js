const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

const loadUser = (req,res) => {
    try{
        let user;
        connection.query(`Select id,username,created_at FROM users WHERE id = '${req.user.id}';`,
            (err, results) => {
                if (err) throw err;
                user = results[0];
                return res.json(user);
            });
    } catch (err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }
};

const login = (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username,password } = req.body;

    try{
        let user;
        connection.query(`SELECT * FROM users WHERE username = '${username}';`,async (err, results) => {
            if (err) throw err;
            if (!results[0]){
                return res.status(400).json({ errors: [ { msg: 'Invalid Credentials' } ] });
            } else {
                user = results[0];

                const isMatch = await bcrypt.compare(password, user.password);

                if(!isMatch){
                    return res
                        .status(400)
                        .json({ errors: [ { msg: 'Invalid Credentials' } ] });
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
                            return res.json({ token });
                        });
                }
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }
};

module.exports = authController = {
    loadUser,
    login
};