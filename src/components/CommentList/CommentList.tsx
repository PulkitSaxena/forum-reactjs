import React from 'react'
import { useContext } from 'react';
import { IComment } from '../../stateManagement/interfaces'
import { store } from '../../stateManagement/store'
import './commentList.css'

export default function CommentList() {
  const globalState = useContext(store);
  let comments = globalState.state.comments.filter(el => el.postId === globalState.state.selectedPostId);

  return (
    <React.Fragment>
       <label className="comments-detail-item">
            <h3>Comments</h3>
        </label>
      {comments.map((el: IComment) => (
        <div className="labels-container comments" key={el.id}>
          <label className="comments-detail-item">
            Comment Title: {el?.name}
          </label>
          <label className="comments-detail-item">
            Poster Email: {el?.email}
          </label>
          <label className="comments-detail-item">
          Comment Body: <textarea disabled= {true} rows={7} value={el?.body}></textarea>
          </label>
        </div>
      ))}
    </React.Fragment>
  )
}