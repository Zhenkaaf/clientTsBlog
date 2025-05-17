import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myAxios from "../../api/axios";
import { AxiosError } from "axios";
import { logout } from "../auth/authSlice";

interface IPostResponse {
    _id: string;
    title: string;
    text: string;
    imgUrl: string;
    views: number;
    authorId: string;
    comments: unknown[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface IPostsResponse {
    posts: IPostResponse[];
    popularPosts: IPostResponse[];
}

interface IPostsState {
    posts: IPostResponse[];
    popularPosts: IPostResponse[];
    myPosts: IPostResponse[];
    currentPost: IPostResponse | null;
    isFetchedMyPosts: boolean;
    isLoading: boolean;
    postErrTxt: string | null;
}
interface UpdatePostPayload {
    postId: string;
    formData: FormData;
}

const initialState: IPostsState = {
    posts: [],
    popularPosts: [],
    myPosts: [],
    currentPost: null,
    isFetchedMyPosts: false,
    isLoading: false,
    postErrTxt: null,
};

const createPost = createAsyncThunk<
    IPostResponse,
    FormData,
    { rejectValue: string }
>("post/createPost", async (formData, { rejectWithValue, dispatch }) => {
    try {
        const res = await myAxios.post<IPostResponse>(
            "/post/create-post",
            formData
        );
        return res.data;
    } catch (err: unknown) {
        console.error("create post error", err);
        let errorMessage = "Failed to create post. Please try later";
        if (err instanceof AxiosError) {
            errorMessage = err.response?.data?.message || errorMessage;
            // Обрабатываем ошибку 403 (например, токен истёк или недействителен)
            if (err.response?.status === 403) {
                localStorage.removeItem("tokenAutovibe");
                dispatch(logout());
            }
        }
        return rejectWithValue(errorMessage);
    }
});

const updatePostById = createAsyncThunk<
    IPostResponse,
    UpdatePostPayload,
    { rejectValue: string }
>(
    "post/updatePostById",
    async ({ postId, formData }, { rejectWithValue, dispatch }) => {
        try {
            const res = await myAxios.put<IPostResponse>(
                `/post/${postId}`,
                formData
            );
            return res.data;
        } catch (err: unknown) {
            console.error("update post error", err);
            let errorMessage = "Failed to update post. Please try later";
            if (err instanceof AxiosError) {
                errorMessage = err.response?.data?.message || errorMessage;
                // Обрабатываем ошибку 403 (например, токен истёк или недействителен)
                if (err.response?.status === 403) {
                    localStorage.removeItem("tokenAutovibe");
                    dispatch(logout());
                }
            }
            return rejectWithValue(errorMessage);
        }
    }
);

const getPostById = createAsyncThunk<
    IPostResponse,
    string,
    { rejectValue: string }
>("post/getPostById", async (postId, { rejectWithValue }) => {
    try {
        const res = await myAxios.get(`/post/${postId}`);
        return res.data;
    } catch (err: unknown) {
        console.error("getPostById error", err);
        let errorMessage = "Failed to get post. Please try again later.";
        if (err instanceof AxiosError) {
            errorMessage = err.response?.data?.message || errorMessage;
        }
        return rejectWithValue(errorMessage);
    }
});

const getMyPosts = createAsyncThunk<
    IPostResponse[],
    void,
    { rejectValue: string }
>("post/getMyPosts", async (_, { rejectWithValue }) => {
    try {
        const res = await myAxios.get("/post/my-posts");
        console.log("get my posts", res.data);
        return res.data;
    } catch (err: unknown) {
        console.error("get my posts error", err);
        let errorMessage = "Get my posts failed. Please try to later";
        if (err instanceof AxiosError) {
            errorMessage = err.response?.data?.message || errorMessage;
        }
        return rejectWithValue(errorMessage);
    }
});

const getPosts = createAsyncThunk<
    IPostsResponse,
    void,
    { rejectValue: string }
>("post/getPosts", async (_, { rejectWithValue }) => {
    try {
        const res = await myAxios.get("/post/posts");
        console.log("get posts", res.data);
        return res.data;
    } catch (err: unknown) {
        console.error("get posts error", err);
        let errorMessage = "Get posts failed. Please try to later";
        if (err instanceof AxiosError) {
            errorMessage = err.response?.data?.message || errorMessage;
        }
        return rejectWithValue(errorMessage);
    }
});

const delPostById = createAsyncThunk<
    { message: string },
    string,
    { rejectValue: string }
>("post/delPostById", async (postId, { rejectWithValue }) => {
    try {
        const res = await myAxios.delete(`/post/${postId}`);
        return res.data;
    } catch (err: unknown) {
        console.error("delPostById error", err);
        let errorMessage = "Failed to delete post. Please try again later.";
        if (err instanceof AxiosError) {
            errorMessage = err.response?.data?.message || errorMessage;
        }
        return rejectWithValue(errorMessage);
    }
});

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        clearCurrentPost(state) {
            state.currentPost = null;
        },
    },
    extraReducers: (builder) => {
        builder
            //CREATE POST
            .addCase(createPost.pending, (state) => {
                state.isLoading = true;
                state.postErrTxt = null;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = [...state.posts, action.payload];
                state.isFetchedMyPosts = false;
                //Можно и push
                //state.posts.push(action.payload);
                //push() изменяет оригинальный массив,
                //но Immer отслеживает это и создаёт новый объект для стейта.
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false;
                state.postErrTxt = action.payload || null;
            })
            //UPDATE POST
            .addCase(updatePostById.pending, (state) => {
                state.isLoading = true;
                state.postErrTxt = null;
            })
            .addCase(updatePostById.fulfilled, (state) => {
                state.isLoading = false;
                state.isFetchedMyPosts = false;
            })
            .addCase(updatePostById.rejected, (state, action) => {
                state.isLoading = false;
                state.postErrTxt = action.payload || null;
            })
            //GET MY POSTS
            .addCase(getMyPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMyPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.myPosts = action.payload;
                state.isFetchedMyPosts = true;
            })
            .addCase(getMyPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.postErrTxt = action.payload || null;
            })
            //GET POSTS
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload.posts;
                state.popularPosts = action.payload.popularPosts;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.postErrTxt = action.payload || null;
            })
            //GET POST
            .addCase(getPostById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPostById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentPost = action.payload;
            })
            .addCase(getPostById.rejected, (state, action) => {
                state.isLoading = false;
                state.postErrTxt = action.payload || null;
            })
            //DEL POST
            .addCase(delPostById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(delPostById.fulfilled, (state, action) => {
                console.log(action);
                state.isLoading = false;
                state.isFetchedMyPosts = false;
            })
            .addCase(delPostById.rejected, (state, action) => {
                state.isLoading = false;
                state.postErrTxt = action.payload || null;
            });
    },
});

export const { clearCurrentPost } = postSlice.actions;
export {
    createPost,
    getMyPosts,
    getPosts,
    getPostById,
    delPostById,
    updatePostById,
};
export default postSlice.reducer;
