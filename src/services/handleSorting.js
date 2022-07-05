// import moment from 'moment';
const handleSorting = (sortType, page = '') => {
  let temp = sortType;

  if (page === 'users' && temp === 'Name') {
    temp = 'Username';
  } else if (page === 'users' && temp === 'Popular') {
    temp = 'Popular users';
  }


  switch (temp) {
    case 'Newest':
      return (a, b) => new Date(b.created_at) - new Date(a.created_at);
    case 'New':
      return (a, b) => new Date(b.created_at) - new Date(a.created_at);
    case 'New Users':
      return (a, b) => new Date(b.created_at) - new Date(a.created_at);
    case 'Top':
      return (a, b) =>
        b.answer_count + b.comment_count - (a.answer_count + a.comment_count);
    case 'Active':
      return (a, b) =>
        b.posts_count + b.tags_count - (a.posts_count + a.tags_count);
    case 'Views':
      return (a, b) => b.views - a.views;
    case 'Oldest':
      return (a, b) => new Date(a.created_at) - new Date(b.created_at);
    case 'Popular':
      return (a, b) => b.posts_count - a.posts_count;
    case 'Name':
      return (a, b) => a.tagname.localeCompare(b.tagname);
    case 'Username':
      return (a, b) => a.localeCompare(b.username);
    case 'Popular users':
      return (a, b) => b.views - a.views;
    case 'Today':
      return (a,b) => {
        const aDate = Date.now() - new Date(a.created_at).getTime()
        const bDate = Date.now() - new Date(b.created_at).getTime()
  
        if (aDate < 86300000 && bDate < 86300000) {
          return b.answer_count + b.comment_count - (a.answer_count + a.comment_count);
        }
      }
    case 'Week':
      return (a, b) => {
        const aDate = Date.now() - new Date(a.created_at).getTime()
        const bDate = Date.now() - new Date(b.created_at).getTime()
        if (aDate < 604800000 && bDate < 604800000) {
          return b.answer_count + b.comment_count - (a.answer_count + a.comment_count);
        }
      }
    case 'Month':
      return (a, b) => {
        const aDate = Date.now() - new Date(a.created_at).getTime()
        const bDate = Date.now() - new Date(b.created_at).getTime()
        if (aDate < 2628000000 && bDate < 2628000000) {
          return b.answer_count + b.comment_count - (a.answer_count + a.comment_count);
        }
      }
    case 'Year':
      return (a, b) => {
        const aDate = Date.now() - new Date(a.created_at).getTime()
        const bDate = Date.now() - new Date(b.created_at).getTime()
        if (aDate < 31540000000 && bDate < 31540000000) {
          return b.answer_count + b.comment_count - (a.answer_count + a.comment_count);
        }
      }
    default:
      break;
  }
}

export default handleSorting;
