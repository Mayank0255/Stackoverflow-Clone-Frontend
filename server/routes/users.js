const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator');

// @route    /api/users
// @access   Private
//GET ALL USERS
router.get('/', (req, res) => {
    try {
        const query = ` SELECT 
                        users.id,username,users.created_at,COUNT(DISTINCT posts.id) 
                        as posts_count,COUNT(DISTINCT tagname) as tags_count 
                        FROM users 
                        LEFT JOIN posts ON posts.user_id = users.id 
                        LEFT JOIN posttag ON posttag.post_id = posts.id 
                        LEFT JOIN tags ON posttag.tag_id = tags.id 
                        GROUP BY users.id ORDER BY posts_count DESC;`
        connection.query(query,
            (err, results) => {
                if (err) throw err;
                if (results.length === 0){
                    return res.status(400).json({ msg: 'There are no users' });
                } else {
                    return res.json(results);
                }
            });
    } catch (err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }
});

//GET SINGLE USER
router.get('/:id', (req, res) => {
    try {
        connection.query( ` SELECT 
                                    users.id,username,users.created_at,COUNT(DISTINCT posts.id) 
                                    as post_count,COUNT(DISTINCT tagname) 
                                    as tag_count, COUNT(DISTINCT answers.id) 
                                    as answer_count, COUNT(DISTINCT comments.id) 
                                    as comment_count 
                                    FROM users 
                                    LEFT JOIN posts ON posts.user_id = users.id 
                                    LEFT JOIN posttag ON posttag.post_id = posts.id 
                                    LEFT JOIN tags ON tags.id = posttag.tag_id 
                                    LEFT JOIN answers ON answers.user_id = users.id 
                                    LEFT JOIN comments ON comments.user_id = users.id 
                                    WHERE users.id = ? GROUP BY users.id;`,
            [ req.params.id ],
            (err, results) => {
                if (err) throw err;
                if (results.length === 0){
                    return res.status(400).json({ msg: 'This user doesn\'t exists' });
                } else {
                    return res.json(results[0]);
                }
            });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Server Error');
    }
});


//=================================== REGISTER ROUTE ===================================================================


router.post(
    '/',
    [
        check('username', 'Please include a valid username').isLength({min:5}),
        check(
            'password',
            'Please enter a password with 5 or more characters'
        ).isLength({ min: 5 })
    ],
    (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username,password } = req.body;

        try{
            let user;
            connection.query(`SELECT * FROM users WHERE username = '${username}';`,async (err, results) => {
                if (err) throw err;
                if (results[0]){
                    return res.status(400).json({ errors: [ { msg: 'User already exists' } ] });
                } else {
                    user = { username,password };
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(password, salt);

                    await connection.query('INSERT INTO users(username,password) VALUES(?,?)',
                        [ user.username,user.password ],
                        (err, results) => {
                        if (err) throw err;
                    });

                    connection.query(`SELECT * FROM users WHERE username = '${username}';`,
                        (err, results) => {
                        if (err) throw err;
                        user = results[0];

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
                    });
                }
            });
        } catch (e) {
            console.log(e);
            return res.status(500).send('Server Error');
        }

    }
);

module.exports = router;