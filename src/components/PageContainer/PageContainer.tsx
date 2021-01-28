import React, { useReducer, useEffect } from 'react';
import Header from '../Header/Header';
import Content from '../Content/Content';
import Footer from '../Footer/Footer';
import useService from '../../customHooks/useService';
import { COMMON_CONSTANTS } from '../../constants/commonConstants'
import { IPost, IComment, IUser } from '../../stateManagement/interfaces'
import { store } from '../../stateManagement/store'
import reducer, { initialState } from '../../stateManagement/reducers'
import './PageContainer.css'

export default function PageContainer() {

  // Use custom hook to fetch all required data
  const postData: Array<IPost> = useService(COMMON_CONSTANTS.GET_POSTS_URL);
  const userData: Array<IUser> = useService(COMMON_CONSTANTS.GET_USERS_URL);
  const commentData: Array<IComment> = useService(COMMON_CONSTANTS.GET_COMMENTS_URL);

  // Initial value to be passed to child hirarchy via context provider
  useEffect(() => {

    if (postData.length >0 && userData.length >0 && commentData.length >0) {
      dispatch({ type: "success", results: userData, resultype: 'Users'});
      dispatch({ type: "success", results: postData, resultype: 'Posts'});
      dispatch({ type: "success", results: commentData, resultype: 'Comments'});
    }
  }, [postData, userData, commentData]);

  // Define global reducers and state
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <React.Fragment>
        <store.Provider value = { value }>
          <div className="page-container">
            <Header/>
            <Content/>
            <Footer/>
          </div>
        </store.Provider>
    </React.Fragment>
  );
}

