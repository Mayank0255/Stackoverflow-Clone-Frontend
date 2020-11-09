const helperFunction = require('../helpers/helperFunction');

// constructor
const Tag = function() {};

Tag.retrieveAll = (result) => {
    const query =  `SELECT 
                        tags.id,posts.id,tagname, description,COUNT(DISTINCT posts.id) 
                        as posts_count,tags.created_at 
                        FROM tags 
                        LEFT JOIN posttag ON posttag.tag_id = tags.id 
                        LEFT JOIN posts ON posts.id = posttag.post_id 
                        GROUP BY tags.id ORDER BY posts_count DESC;`

    pool.query(query,
        (err, results) => {
            if (err || results.length === 0) {
                console.log('error: ', err);
                result(
                    helperFunction.responseHandler(false, err ? err.statusCode : 404, err ? err.message : 'There are no tags', null),
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

Tag.retrieveOne = (tagName, result) => {
    const query =  `SELECT 
                        tags.id,posts.id,description,tagname,COUNT(DISTINCT posts.id) 
                        as posts_count,tags.created_at 
                        FROM tags 
                        LEFT JOIN posttag ON posttag.tag_id = tags.id 
                        LEFT JOIN posts ON posts.id = posttag.post_id 
                        WHERE tagname = ? GROUP BY tags.id;`

    pool.query(query,
        tagName,
        (err, results) => {
            if (err || results.length === 0) {
                console.log('error: ', err);
                result(
                    helperFunction.responseHandler(false, err ? err.statusCode : 404, err ? err.message : 'This tag doesn\'t exists', null),
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

module.exports = Tag;