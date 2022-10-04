import React, { useState, useEffect } from 'react';
import './TagsByUser.styles.scss';
import { allPostsData } from '../../../api/postsApis';

function TagsByUser({ user }) {

    const [allTagsByUser, setallTagsByUser] = useState([]);

    async function getData() {
        let tagData = [];
        await allPostsData().then((res) => {
            let data = res.data.data.filter((val) => {
                if (val.user_id == user.id) {
                    return val
                }
            })

            data.map((tag) => {
                tagData.push(...tag.tags)
            })
        })
            .catch((err) => {
                console.log(err);
            })
        return tagData;
    }

    async function handleTag() {
        let aa = await getData()
            .then((res) => { return res })
            .catch((err) => { return err })

        let counts = aa.reduce((acc, curr) => {
            const str = JSON.stringify(curr.tagname);
            acc[str] = (acc[str] || 0) + 1;
            return acc;
        }, {});

        const arrayOfObj = Object.entries(counts).map((e) => ({ 'tagname': e[0], 'count': e[1] }));
        setallTagsByUser(arrayOfObj)
    }

    useEffect(() => {
        getData()
        handleTag()
    }, [])

    return (
        <div className='UAT_div'>
            <div className='UAT_head'>
                <h2>Tags</h2>
            </div>
            <div className='UAT_list'>{allTagsByUser.map((tag, index) => (
                <div className='UAT' key={index}>
                    <p className='tagname'>{tag.tagname.substring(1, tag.tagname.length-1)}</p>
                    <div className='score_tag'>
                        <p>0 <span>score</span></p>
                        <p>{tag.count} <span>post</span></p>
                    </div>
                </div>
            ))}</div>
        </div>
    )
}

export default TagsByUser;