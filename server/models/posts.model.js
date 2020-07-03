const helperFunction = require('../helpers/helperFunction');

// constructor
const Post = function(post) {
    this.title = post.title;
    this.body = post.body;
    this.userId = post.userId;
    this.tagname = post.tagname;
};

Post.create = (newPost, result) => {
    pool.query('INSERT INTO posts(title,body,user_id) VALUES (?,?,?);SET @v1 := (SELECT LAST_INSERT_ID());INSERT IGNORE INTO tags(tagname) VALUES (?);SET @v2 := (SELECT id FROM tags WHERE tagname = ?);INSERT INTO posttag(post_id,tag_id) VALUES(@v1,@v2);',
        [ newPost.title, newPost.body, newPost.userId, newPost.tagname, newPost.tagname ],
        (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(
                helperFunction.responseHandler(false, err.statusCode, err.message, null),
                null
            );
            return;
        }
        result(
            null,
            helperFunction.responseHandler(true, 200, 'Post Created', res.insertId)
        );
    });
};

Post.remove = (id, result) => {
    pool.query('DELETE FROM posttag WHERE post_id = ?; DELETE FROM comments WHERE post_id = ?; DELETE FROM answers WHERE post_id = ?; DELETE FROM posts WHERE id = ? ;' ,
        [ id, id, id, id ] ,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(
                    helperFunction.responseHandler(false, err.statusCode, err.message, null),
                    null
                );
                return;
            }
            result(
                null,
                helperFunction.responseHandler(true, 200, 'Post Removed', null)
            );
        });
}

// Post.retrieveOne = ({ action, tagName }, result) => {
//     let query = '';
//     let base = `SELECT
//                 posts.id,posts.user_id,username,COUNT(DISTINCT answers.id)
//                 as answer_count,COUNT(DISTINCT comments.id)
//                 as comment_count,tag_id,title,posts.body,tagname,posts.created_at
//                 FROM posts
//                 JOIN posttag ON posts.id = post_id
//                 JOIN tags ON tag_id = tags.id
//                 JOIN users ON user_id = users.id
//                 LEFT JOIN answers ON answers.post_id = posts.id
//                 LEFT JOIN comments ON posts.id = comments.post_id `;
//
//     if (action === 'basic') {
//         query = 'GROUP BY posts.id ORDER BY posts.created_at DESC;';
//     } else if (action === 'top') {
//         query = 'GROUP BY posts.id ORDER BY answer_count DESC,comment_count DESC;';
//     } else if (action === 'tag') {
//         query = 'WHERE tags.tagname = ? GROUP BY posts.id ORDER BY posts.created_at DESC;';
//     } else {
//         result(
//             helperFunction.responseHandler(false, 400, 'Incorrect Action', null),
//             null
//         );
//         return;
//     }
//     pool.query(base + query,
//         tagName ? tagName : null,
//         (err, results) => {
//             if (err || results.length === 0) {
//                 console.log("error: ", err);
//                 result(
//                     helperFunction.responseHandler(false, err ? err.statusCode : 404, err ? err.message : 'There are no posts', null),
//                     null
//                 );
//                 return;
//             }
//             result(
//                 null,
//                 helperFunction.responseHandler(true, 200, 'Success', results)
//             );
//         });
// }

Post.retrieveAll = ({ action, tagName }, result) => {
    let query = '';
    let base = `SELECT 
                posts.id,posts.user_id,username,COUNT(DISTINCT answers.id) 
                as answer_count,COUNT(DISTINCT comments.id) 
                as comment_count,tag_id,title,posts.body,tagname,posts.created_at 
                FROM posts 
                JOIN posttag ON posts.id = post_id 
                JOIN tags ON tag_id = tags.id 
                JOIN users ON user_id = users.id 
                LEFT JOIN answers ON answers.post_id = posts.id 
                LEFT JOIN comments ON posts.id = comments.post_id `;

    if (action === 'basic') {
        query = 'GROUP BY posts.id ORDER BY posts.created_at DESC;';
    } else if (action === 'top') {
        query = 'GROUP BY posts.id ORDER BY answer_count DESC,comment_count DESC;';
    } else if (action === 'tag') {
        query = 'WHERE tags.tagname = ? GROUP BY posts.id ORDER BY posts.created_at DESC;';
    } else {
        result(
            helperFunction.responseHandler(false, 400, 'Incorrect Action', null),
            null
        );
        return;
    }
    pool.query(base + query,
        tagName ? tagName : null,
        (err, results) => {
            if (err || results.length === 0) {
                console.log("error: ", err);
                result(
                    helperFunction.responseHandler(false, err ? err.statusCode : 404, err ? err.message : 'There are no posts', null),
                    null
                );
                return;
            }
            result(
                null,
                helperFunction.responseHandler(true, 200, 'Success', results)
            );
        });
}

module.exports = Post;