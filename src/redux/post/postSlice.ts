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

interface IPostsState {
    posts: IPostResponse[];
    popularPosts: IPostResponse[];
    isLoading: boolean;
    postErrTxt: string | null;
}
const initialState: IPostsState = {
    posts: [],
    popularPosts: [],
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

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
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
                //state.posts.push(action.payload);
                //push() изменяет оригинальный массив,
                //но Immer отслеживает это и создаёт новый объект для стейта.
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false;
                state.postErrTxt = action.payload || null;
            });
    },
});

/* export const { clearPostErrTxt } = postSlice.actions; */
export { createPost };
export default postSlice.reducer;
