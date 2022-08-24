import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import censorBadWords from "../../../services/censorBadWords";

import htmlSubstring from "../../../services/htmlSubstring";
import injectEllipsis from "../../../services/injectEllipsis";

import UserCard from "../UserCard/UserCard.component";
import TagBadge from "../TagBadge/TagBadge.component";

import "./PostItem.styles.scss";

const PostItem = ({
  post: {
    id,
    title,
    body,
    username,
    gravatar,
    user_id,
    answer_count,
    comment_count,
    views,
    created_at,
    tags,
  },
}) => {
  const answerVoteUp = (
    <div className="vote answer">
      <span className="vote-count">{answer_count}</span>
      <div className="count-text">answers</div>
    </div>
  );

  const answerVoteDown = (
    <div className="vote">
      <span className="vote-count">{answer_count}</span>
      <div className="count-text">answers</div>
    </div>
  );

  return (
    <div className="posts">
      <div className="stats-container fc-black-500">
        <div className="stats">
          <div className="vote">
            <span className="vote-count">{comment_count}</span>
            <div className="count-text">comments</div>
          </div>
          {answer_count > 0 ? answerVoteUp : answerVoteDown}
          <div className="vote">
            <span className="vote-count">{tags.length}</span>
            <div className="count-text">tags</div>
          </div>
          <div className="vote">
            <div className="count-text">{views} views</div>
          </div>
        </div>
      </div>
      <div className="summary">
        <h3>
          <Link to={`/questions/${id}`}>{censorBadWords(title)}</Link>
        </h3>
        <div
          className="brief"
          dangerouslySetInnerHTML={{
            __html: injectEllipsis(censorBadWords(htmlSubstring(body, 200))),
          }}
        ></div>
        <div className="profile-tags">
          {tags.map((tag, index) => (
            <TagBadge key={index} tag_name={tag.tagname} size={"s-tag"} />
          ))}
        </div>
        <UserCard
          created_at={created_at}
          user_id={user_id}
          gravatar={gravatar}
          username={username}
          float={"right"}
          backgroundColor={"transparent"}
        />
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default connect(null)(PostItem);
