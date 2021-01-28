import React from 'react';
import PostList from '../PostList/PostList'
import { useContext } from 'react';
import { store } from '../../stateManagement/store'
import UserDetails from '../UserDetails/UserDetails'
import PostDetails from '../PostDetails/PostDetails'
import './Content.css'

export default function Content() {
  const globalState = useContext(store);
  
  if (globalState.state.viewType === "Home") {
    return (
      <div className="content-container">
        {/* Section 1 to display list of posts */}
        <PostList/>
      </div>
    );
  } else if (globalState.state.viewType === "User") {
    return (
      <div className="content-container">
        {/* Section 2 to display user details of post */}
        <UserDetails/>
      </div>
    );
  } else {
    return (
      <div className="content-container">
        {/* Section 3 to display post details */}
        <PostDetails/>
      </div>
    );
  }

  
}