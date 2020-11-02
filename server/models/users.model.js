const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const helperFunction = require('../helpers/helperFunction');

// constructor
const User = function(user) {
    this.username = user.username;
    this.password = user.password;
};

User.register = async (newUser, result) => {
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    const query = `INSERT INTO users(username,password) VALUES(?,?);`;

    await pool.query(query,
        [ newUser.username, newUser.password ],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(
                    helperFunction.responseHandler(false, err.statusCode, err.message, null),
                    null
                );
                return;
            }

            const payload = {
                user: {
                    id: res.insertId
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) {
                        console.log('error: ', err);
                        result(
                            helperFunction.responseHandler(false, err.statusCode, err.message, null),
                            null
                        );
                        return;
                    }
                    result(
                        null,
                        helperFunction.responseHandler(true, 200, 'User registered', {'token': token})
                    );
                });
        });
};

User.login = (newUser, result) => {
    const query = `SELECT * FROM users WHERE username = ?;`;


    pool.query(query,
        newUser.username,
        async (err, results) => {
            if (err || !results[0]) {
                console.log('error: ', err);
                const code = !results[0] ? 404 : err.statusCode;
                result(
                    helperFunction.responseHandler(false, code, !results[0] ? 'User does not exists' : err.message, null),
                    null
                );
                return;
            }

            const user = results[0];

            const isMatch = await bcrypt.compare(newUser.password, user.password);

            if(!isMatch){
                result(
                    helperFunction.responseHandler(false, 400, 'Incorrect password', null),
                    null
                );
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) {
                        console.log('error: ', err);
                        result(
                            helperFunction.responseHandler(false, err.statusCode, err.message, null),
                            null
                        );
                        return;
                    }
                    result(
                        null,
                        helperFunction.responseHandler(true, 200, 'User logged in', {'token': token})
                    );
                });
    });
};

User.retrieve = ({ action, id }, result) => {
    action = action.toLowerCase();
    const updateQuery = `UPDATE users SET views = views + 1 WHERE users.id = ?;`
    const head = `  SELECT users.id,username,users.created_at, users.views, COUNT(DISTINCT posts.id) `;
    const middle = `FROM users 
                    LEFT JOIN posts ON posts.user_id = users.id 
                    LEFT JOIN posttag ON posttag.post_id = posts.id 
                    LEFT JOIN tags ON posttag.tag_id = tags.id`;

    const q1 = `as posts_count,COUNT(DISTINCT tagname) as tags_count  
                 ${middle} GROUP BY users.id ORDER BY posts_count DESC;`;

    const q2 = `as post_count,COUNT(DISTINCT tagname) 
                as tag_count, COUNT(DISTINCT answers.id) 
                as answer_count, COUNT(DISTINCT comments.id) 
                as comment_count 
                 ${middle} LEFT JOIN answers ON answers.user_id = users.id 
                LEFT JOIN comments ON comments.user_id = users.id 
                WHERE users.id = ? GROUP BY users.id;`

    if (action === 'one') {
        pool.query(updateQuery,
            id,
            (err, results) => {
                if (err) {
                    console.log('error: ', err);
                    result(
                        helperFunction.responseHandler(false, err ? err.statusCode : 404, err ? err.message : 'There isn\'t any user by this id', null),
                        null
                    );
                }
        });
    }

    pool.query(action === 'one' ? head + q2 : head + q1,
        action === 'one' ? id : null,
        (err, results) => {
            if (err || results.length === 0) {
                console.log('error: ', err);
                result(
                    helperFunction.responseHandler(false, err ? err.statusCode : 404, err ? err.message : 'There are no users', null),
                    null
                );
                return;
            }
            result(
                null,
                helperFunction.responseHandler(true, 200, 'Success', action === 'one' ? results[0] : results)
            );
        });
}

User.loadUser = (user_id, result) => {
    const query = `SELECT id,username,created_at FROM users WHERE id = ?;`;

    pool.query(query,
        user_id,
        (err, results) => {
            if (err) {
                console.log('error: ', err);
                result(
                    helperFunction.responseHandler(false, err.statusCode, err.message, null),
                    null
                );
                return;
            }
            result(
                null,
                helperFunction.responseHandler(true, 200, 'Success', results[0])
            );
        });
}

module.exports = User;