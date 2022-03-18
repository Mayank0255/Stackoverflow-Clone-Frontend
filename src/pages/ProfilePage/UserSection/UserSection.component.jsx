import React from "react";

import AvatarCard from "./AvatarCard/AvatarCard.component";
import ContentCard from "./ContentCard/ContentCard.component";

import './UserSection.styles.scss';

const UserSection = ({ user }) => (
  <div className='grid'>
    <AvatarCard
      id={user.id}
      gravatar={user.gravatar}
      views={user.views}
    />
    <ContentCard
      username={user.username}
      answers_count={user.answers_count}
      posts_count={user.posts_count}
      comments_count={user.comments_count}
      tags_count={user.tags_count}
      created_at={user.created_at}
    />
  </div>
)

export default UserSection;