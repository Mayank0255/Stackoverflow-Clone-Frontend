import React, { useEffect, Fragment } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPost } from "../../redux/posts/posts.actions";

import LinkButton from "../../components/molecules/LinkButton/LinkButton.component";
import Spinner from "../../components/molecules/Spinner/Spinner.component";
import AnswerSection from "./AnswerSection/AnswerSection.component";
import QuestionSection from "./QuestionSection/QuestionSection.component";

import "./Post.styles.scss";
import censorBadWords from "../../utils/censorBadWords";

const Post = ({ getPost, post: { post, loading } }) => {
  const { id } = useParams();

  useEffect(() => {
    getPost(id);
    // eslint-disable-next-line
  }, [getPost]);

  return loading || post === null ? (
    <Spinner type="page" width="75px" height="200px" />
  ) : (
    <Fragment>
      <div id="mainbar" className="post">
        <div className="question-header fc-black-800 pl24">
          <h1>{censorBadWords(post.title)}</h1>
          <div>
            <LinkButton
              text={"Ask Question"}
              link={"/add/question"}
              type={"s-btn__primary"}
            />
          </div>
        </div>
        <div className="question-date fc-black-800 pl24">
          <div className="grid-cell">
            <span className="fc-light">Asked</span>
            <time dateTime={moment(post.created_at).fromNow(true)}>
              {moment(post.created_at).fromNow(true)} ago
            </time>
          </div>
        </div>
        <div className="question-main pl24 pt16">
          <QuestionSection />
          <AnswerSection />
        </div>
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
