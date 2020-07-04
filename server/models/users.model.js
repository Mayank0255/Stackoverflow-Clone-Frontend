const helperFunction = require('../helpers/helperFunction');

// constructor
const User = function(user) {
    this.username = user.username;
    this.password = user.password;
};

User.retrieve = ({ action, id }, result) => {
    action = action.toLowerCase();
    const head = `  SELECT users.id,username,users.created_at,COUNT(DISTINCT posts.id)`;
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

module.exports = User;