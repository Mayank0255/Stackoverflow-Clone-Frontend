import React, { useEffect, useState } from 'react';
import './QuestionByUser.styles.scss';
import { allPostsData } from '../../../api/postsApis';

function QuestionByUser({ user }) {

  const [question, setquestion] = useState([]);
  const [filterSelect, setfilterSelect] = useState([true, 's'])

  async function getData() {
    let posts = await allPostsData().then((res) => {
      let data = res.data.data.filter((val) => {
        if (val.user_id == user.id) {
          return val
        }
      })
      setquestion(data);
      return data
    })
      .catch((err) => {
        console.log(err);
      })

    return posts
  }

  useEffect(() => {
    getData()
  }, [])

  async function handleFilter(e) {
    setfilterSelect([true, e])

    if (e == 'a') {
      let dataByActivity = await getData().then((res) => { return res }).catch((err) => { console.log(err); })
      setquestion(dataByActivity.sort((a, b) => { return b.comment_count - a.comment_count }));
    } else if (e == 'n') {
      let dataByActivity = await getData().then((res) => { return res }).catch((err) => { console.log(err); })
      setquestion(dataByActivity.sort((a, b) => { return new Date(b.created_at) - new Date(a.created_at) }));
    } else if (e == 'v') {
      let dataByActivity = await getData().then((res) => { return res }).catch((err) => { console.log(err); })
      setquestion(dataByActivity.sort((a, b) => { return b.views - a.views }));
    }
  }



  return (
    <div className='User_Asked_Qdiv'>
      <div className='UAQ_headdiv'>
        <h2>Questions</h2>
        <div className='UAQ_Filterdiv'>
          <p style={{ backgroundColor: filterSelect[0] == true && filterSelect[1] == 's' ? 'gray' : '' }} onClick={() => handleFilter('s')} >Score</p>
          <p style={{ backgroundColor: filterSelect[0] == true && filterSelect[1] == 'a' ? 'gray' : '' }} onClick={() => handleFilter('a')} >Activity</p>
          <p style={{ backgroundColor: filterSelect[0] == true && filterSelect[1] == 'n' ? 'gray' : '' }} onClick={() => handleFilter('n')} >Newest</p>
          <p style={{ backgroundColor: filterSelect[0] == true && filterSelect[1] == 'v' ? 'gray' : '' }} onClick={() => handleFilter('v')} >Views</p>
        </div>
      </div>
      <div className='UAQ_list'>
        {question.slice(0, 5).map((val, index) => {
          let creat_at = new Date(val.created_at).getDate() + "/" + new Date(val.created_at).getMonth() + "/" + new Date(val.created_at).getFullYear()
          return (
            <div key={index} className='UAQ'>
              <p>-2</p>
              <p>{val.title}</p>
              <p>{creat_at}</p>
            </div>
          )
        })}
      </div>
      {question.length > 5 ? <div className='UAQ_showMore'>
        <p>Show More</p>
      </div> : null}
    </div>
  )
}

export default QuestionByUser;