const helperFunction = require('../helpers/helperFunction');
const Tag = require('../models/tags.model');

const getTags = (req, res) => {
    try {
        Tag.retrieveAll((err, data) => {
            if (err) {
                console.log(err);
                return res.status(err.code).json(err);
            }
            return res.status(data.code).json(data);
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