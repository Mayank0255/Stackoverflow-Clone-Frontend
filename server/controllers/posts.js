import validator from 'express-validator';
import helperFunction from '../helpers/helperFunction.js';
import Post from '../models/posts.model.js';

const getPosts = (req, res) => {
  const {tagname} = req.params;

  try {
    Post.retrieveAll(
      {
        // eslint-disable-next-line no-nested-ternary
        action: tagname ? 'tag' : req.url.includes('top') ? 'top' : 'basic',
        tagName: tagname,
      },
      (err, data) => {
        if (err) {
          console.log(err);
          return res.status(err.code).json(err);
        }
        return res.status(data.code).json(data);
      }
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(helperFunction.responseHandler(true, 500, 'Server Error', null));
  }
};

const getSinglePost = (req, res) => {
  try {
    Post.retrieveOne(req.params.id, (err, data) => {
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

const addPost = (req, res) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(
        helperFunction.responseHandler(false, 400, errors.array()[0].msg, null)
      );
  }
  try {
    const post = new Post({
      title: req.body.title,
      body: req.body.body,
      userId: req.user.id,
      tagname: req.body.tagname,
    });
    // Save Post in the database
    Post.create(post, (err, data) => {
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

const deletePost = (req, res) => {
  try {
    Post.remove(req.params.id, (err, data) => {
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
  getPosts,
  getSinglePost,
  addPost,
  deletePost,
};
