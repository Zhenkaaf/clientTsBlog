export interface IUserInfo {
    _id: string;
    email: string;
    posts: [];
    createdAt: string;
    updatedAt: string;
}

export interface IFormInputs {
    email: string;
    password: string;
}

export interface IComment {
    _id: string;
    text: string;
    author: {
        email: string;
    };
    postId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IPostResponse {
    _id: string;
    title: string;
    text: string;
    imgUrl: string;
    views: number;
    comments: string[];
    author: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}
export interface IPostResponsePopulated {
    _id: string;
    title: string;
    text: string;
    imgUrl: string;
    views: number;
    comments: string[];
    author: {
        email: string;
    };
    createdAt: string;
    updatedAt: string;
    __v?: number;
}
