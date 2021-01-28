import React from 'react'
import './PostList.css'
import { useContext } from 'react';
import { IPost } from '../../stateManagement/interfaces'
import { store } from '../../stateManagement/store'


export default function PostList() {
  const globalState = useContext(store);

  /**
   * Function to switch to post details view
   * @param id
   */
  function switchToPostView(id: number) {
    globalState.dispatch({ type: "switchView", viewType: "Post" });
    globalState.dispatch({ type: "selectPost", postId: id})
  }

  /**
   * Function to switch view to User detail
   * @param id 
   * @param e 
   */
  function switchToUserView(id: number, e:React.MouseEvent) {
    e.stopPropagation();
    globalState.dispatch({ type: "switchView", viewType: "User" });
    globalState.dispatch({ type: "selectUser", userId: id})
  }

  return (
    <React.Fragment>
      <div className="list-wrapper">
        {globalState.state.posts.map((el: IPost) => (
          <div className="postCard" key={el.id}>
            <div className="postCard-title-block" onClick={() => switchToPostView(el.id)}>{el.title}</div>
            <div className="postCard-user-block" onClick={() => switchToPostView(el.id)}>
              <button className="button-link" onClick={(e) => switchToUserView(el.userId, e)}>{el.userName}</button>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}