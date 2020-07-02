const helperFunction = require('../helpers/helperFunction');

const getTags = (req, res) => {
    try {
        const query =  `SELECT 
                        tags.id,posts.id,tagname,COUNT(DISTINCT posts.id) 
                        as posts_count,tags.created_at 
                        FROM tags 
                        LEFT JOIN posttag ON posttag.tag_id = tags.id 
                        LEFT JOIN posts ON posts.id = posttag.post_id 
                        GROUP BY tags.id ORDER BY posts_count DESC;`

        connection.query(query,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res
                        .status(err.statusCode)
                        .json(helperFunction.responseHandler(false, err.statusCode, err.message, null));
                }
                if (results.length === 0){
                    return res
                        .status(400)
                        .json(helperFunction.responseHandler(false, 400, 'There are no tags', null));
                } else {
                    return res
                        .status(200)
                        .json(helperFunction.responseHandler(true, 200, 'Success', results));
                }
            });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
    }
};

module.exports = tagsController = {
    getTags
}