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
                if (err) throw err;
                if (results.length === 0){
                    return res.status(400).json({ msg: 'There are no tags' });
                } else {
                    return res.json(results);
                }
            });
    } catch (err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }
};

module.exports = tagsController = {
    getTags
}