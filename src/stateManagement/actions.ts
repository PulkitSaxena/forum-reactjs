import { IPost, IComment, IUser, viewType, resultType } from './interfaces';

/**
 * Definition for actions
 */
export type Actions =
 | { type: 'fetching' }
 | { type: 'success', results: IPost[] | IComment[] | IUser[], resultype: resultType }
 | { type: 'switchView', viewType: viewType }
 | { type: 'failure', error: string }
 | { type: 'selectUser', userId: number }
 | { type: 'selectPost', postId: number };