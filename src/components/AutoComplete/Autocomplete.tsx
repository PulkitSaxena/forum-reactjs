import React, { ChangeEvent, useState } from 'react'
import { useContext } from 'react';
import { store } from '../../stateManagement/store'
import { IUser } from '../../stateManagement/interfaces'
import './Autocomplete.css'
import { debounce } from 'throttle-debounce';

/**
 *  AutoComplete component related code
 */
export default function AutoComplete() {
    // Access global context to extract users list
    const globalState = useContext(store);
    let suggestionsListComponent: any;
    const initialState = {
        activeSuggestion: 0,
        showSuggestions: true,
        filteredSuggestions: [] as IUser[],
        userInput: ""
    };
    // Use state
    const [data, setData] = useState(initialState);


    /**
     * Function to dispatch user selection action
     * @param id 
     */
    function selectUserForDetails(id: number) {
        globalState.dispatch({ type: "selectUser", userId: id });
        setData({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: ""
        });
    }

    /**
     * Internal function to filter search containing users
     * @param userInput 
     */
    const _performAutoCompleteSerch= (userInput: string) => {
        
        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = globalState.state.users.filter(
            suggestion =>
                suggestion.username.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        setData({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: data.userInput
        });
    }
    // Generate a debaounced function
    const _autocompleteSearchDebounced = debounce(300, _performAutoCompleteSerch);

    /**
     * Function to be executed onChange event of input textbox
     * @param e 
     */
    const autoOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const userInput = e.currentTarget.value;
        setData({
            activeSuggestion: 0,
            filteredSuggestions: data.filteredSuggestions,
            showSuggestions: true,
            userInput: userInput
        });
        _autocompleteSearchDebounced(userInput);
    };

    /**
     * Function to be executed onClick event of input textbox
     * @param e 
     */
    const autoOnClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setData({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.value
        });
    };

    /**
     * Logic to generate unordered list of suggestions
     */
    if (data.showSuggestions && data.userInput) {
        if (data.filteredSuggestions.length) {
            suggestionsListComponent = (
                <ul className="suggestions">
                    {data.filteredSuggestions.map((suggestion, index) => {
                        let className;

                        return (
                            <li className={className} key={suggestion.id} onClick={() => selectUserForDetails(suggestion.id)}>
                                {suggestion.username}
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            suggestionsListComponent = (
                <div className="no-suggestions">
                    <em>No suggestions, continue typing!</em>
                </div>
            );
        }
    }

    return (
        <React.Fragment>
            <div className="autoComplete-container">
                <input
                    type="text"
                    name="searchInput"
                    placeholder="Serch a user by username"
                    onChange={autoOnChange}
                    onKeyDown={autoOnClick}
                />
                {suggestionsListComponent}
            </div>
        </React.Fragment>
    )
}