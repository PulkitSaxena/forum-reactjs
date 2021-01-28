import React from 'react'
import { useContext } from 'react';
import { store } from '../../stateManagement/store'
import CommentList from '../CommentList/CommentList'


export default function PostDetails() {
    const globalState = useContext(store);
    const postDetails = globalState.state.posts.find(el => el.id === globalState.state.selectedPostId);

    /**
     * Function to switch view to home
     */
    function switchToHomeView() {
        globalState.dispatch({ type: "switchView", viewType: "Home" });
    }

    return (
        <React.Fragment>
            <div><div className="button-link back-button" onClick={() => switchToHomeView()}>Back To Home</div></div>
            <div className="entity-detail-container">
                <div className="labels-container">
                    <label className="entity-detail-item"><h2>
                        Post Details
                    </h2></label>
                    <label className="entity-detail-item">
                        Title: <input disabled = {true} type="text" name="title" value={postDetails?.title} />
                    </label>
                    <label className="entity-detail-item">
                        Poster: <input disabled = {true} type="text" name="postUserName" value={postDetails?.userName}/>
                    </label>
                    <CommentList/>
                </div>
            </div>
        </React.Fragment>
    )
}