export interface IPost { 
    id: number,
    title: string,
    userId: number,
    body: string,
    userName?: string
};

export interface IUser { 
    id: number,
    name: string,
    username: string,
    email: string,
    website: string,
    company: ICompanyDetails
};

export interface ICompanyDetails {
    name: string,
    catchPhrase: string,
    bs: string
}

export interface IComment {
    id: number,
    postId: number,
    name: string,
    email: string,
    body: string
}

export interface IInitialStore {
    posts: Array<IPost>,
    users: Array<IUser>,
    comments: Array<IComment>,
    viewType: viewType,
    selectedUserId: number,
    selectedPostId: number
}

export type viewType = "Home" | "User" | "Post"

export type resultType = "Posts" | "Comments" | "Users"
