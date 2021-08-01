import helperFunction from '../helpers/helperFunction.js';
import Tag from '../models/tags.model.js';

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

const getSingleTag = (req, res) => {
  try {
    Tag.retrieveOne(req.params.tagname, (err, data) => {
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

export default {
  getTags,
  getSingleTag,
};
