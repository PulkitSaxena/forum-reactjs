import React from 'react'
import './UserDetails.css'
import { useContext } from 'react';
import { store } from '../../stateManagement/store'
import AutoComplete from '../AutoComplete/Autocomplete'


export default function UserDetails() {
    const globalState = useContext(store);
    const userDetails = globalState.state.users.find(el => el.id === globalState.state.selectedUserId);

    /**
     * Function to switch to home view
     */
    function switchToHomeView() {
        globalState.dispatch({ type: "switchView", viewType: "Home" });
    }

    return (
        <React.Fragment>
            <div><div className="button-link back-button" onClick={() => switchToHomeView()}>Back To Home</div></div>
            <div className="entity-detail-container">
                <div className="labels-container">
                <AutoComplete/>
                    <label className="entity-detail-item"><h2>
                        User Details
                    </h2></label>
                    <label className="entity-detail-item">
                        Name: <input disabled = {true} type="text" name="name" value={userDetails?.name} />
                    </label>
                    <label className="entity-detail-item">
                        User Name: <input disabled = {true} type="text" name="userName" value={userDetails?.username}/>
                    </label>
                    <label  className="entity-detail-item">
                        Email: <input disabled = {true} type="text" name="email" value={userDetails?.email}/>
                    </label>
                    <label className="entity-detail-item">
                        Website: <input disabled = {true} type="text" name="website" value={userDetails?.website} />
                    </label>
                    <label  className="entity-detail-item">
                        Company: <input disabled = {true} type="text" name="companyName" value={userDetails?.company?.name}/>
                    </label>
                    <label className="entity-detail-item">
                        Catch Phrase: <input disabled = {true} type="text" name="catchPhrase" value={userDetails?.company?.catchPhrase}/>
                    </label>
                    <label className="entity-detail-item">
                        Company Bs: <input disabled = {true} type="text" name="companyBs" value={userDetails?.company?.bs}/>
                    </label>
                </div>
            </div>
        </React.Fragment>
    )
}