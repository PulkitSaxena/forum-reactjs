import { Actions } from './actions'
import { IComment, IInitialStore, IPost, IUser } from '../stateManagement/interfaces'

export const initialState: IInitialStore  = {
    posts: [],
    comments: [],
    users: [],
    viewType: "Home",
    selectedUserId: 0,
    selectedPostId: 0
};

function mergeUserAndPostDetails(state: IInitialStore, posts: IPost[]) {
    if (state.users.length >0 && posts.length >0) {
        posts.forEach(el => {
            el.userName = ((state.users.find(us => us.id === el.userId) || {}).username || "")
        })
    } 
    return { ...state, posts: posts as IPost[]};
}

const reducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case 'fetching':
            return { ...initialState };
        case 'success': {
            if (action.resultype === "Posts") 
                return mergeUserAndPostDetails(state, action.results as IPost[]);
            else if (action.resultype === "Users")
                return { ...state, users: action.results as IUser[]}
            else if (action.resultype === "Comments")
                return { ...state, comments: action.results as IComment[]}
            else
                return { ...state };
        }
        case 'failure':
            return { ...state };
        case 'switchView':
            return { ...state, viewType: action.viewType };
        case 'selectUser':
            return { ...state, selectedUserId: action.userId }
        case 'selectPost':
                return { ...state, selectedPostId: action.postId }
        default:
            return state;
    }
};

export default reducer;